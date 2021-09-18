import { Injectable } from '@nestjs/common';
import * as SerialPort2 from 'serialport';
import { Button } from './button';
import { DataProvider } from './data-provider';
import { Display } from './display';

const Delimiter = require("@serialport/parser-delimiter");

@Injectable()
export class SerialService {

    private port: SerialPort2;

    private testNumber = 0;

    private dataProviders: DataProvider[] = [];

    constructor() {
        this.port = new SerialPort2("/dev/ttyUSB0", { baudRate: 9600 }, function (error) {
            if (error) {
                console.log("Error opening serial port: " + error);
            }
        });

        const parser = this.port.pipe(new Delimiter({ delimiter: ";" }));
        parser.on("data", (data: Buffer) => {
            console.log("Data: " + data);
            this.dataProviders.forEach(provider => provider.offerData(data.toString()));
        });

        this.dataProviders = [
            new Button(1, () => {
                this.testNumber++;
                this.updateDisplay();
            })
        ]
    }

    private updateDisplay() {
        let tag = "d1:".split("").map(char => char.charCodeAt(0));
        const text = Display.encodeNumber(this.testNumber);

        this.port.write([...tag, ...text, ";".charCodeAt(0)])
    }
}
