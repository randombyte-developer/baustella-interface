import { Injectable } from '@nestjs/common';
import * as SerialPort2 from 'serialport';
import { ConfigService } from 'src/config/config.service';
import { Display } from 'src/display/display';
import { State } from 'src/display/state';
import { Button } from './button';
import { DataProvider } from './data-provider';
import { Scale } from './scale';

const Delimiter = require("@serialport/parser-delimiter");

@Injectable()
export class SerialService {

    private readonly port: SerialPort2;

    private readonly dataProviders: DataProvider[] = [];

    private readonly state: State;
    private readonly display: Display;

    constructor(private readonly configService: ConfigService) {

        this.dataProviders = [
            new Button(0, () => { this.state.pressedMinus(); }),
            new Button(1, () => { this.state.pressedEnter(); }),
            new Button(3, () => { this.state.pressedPlus(); }),

            new Scale(0, configService, () => { this.display.updateDisplay(); }),
            new Scale(1, configService, () => { this.display.updateDisplay(); })
        ];

        this.state = new State(configService, () => { this.display.updateDisplay(); });

        this.display = new Display(configService, this.state, this.dataProviders, (text: string) => {
            const tag = [..."d0:"].map(char => char.charCodeAt(0));
            const textData = Utils.encodeText(text);
            this.port.write([...tag, ...textData, ";".charCodeAt(0)])
        });

        this.port = new SerialPort2("/dev/ttyUSB0", { baudRate: 9600 }, function (error) {
            if (error) {
                console.log("Error opening serial port: " + error);
            }
        });

        const parser = this.port.pipe(new Delimiter({ delimiter: ";" }));
        parser.on("data", (data: Buffer) => {
            this.dataProviders.forEach(provider => provider.offerData(data.toString()));
        });
    }
}
