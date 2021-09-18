import { Injectable } from '@nestjs/common';
import * as SerialPort2 from 'serialport';
import { Display } from './display';

const Delimiter = require("@serialport/parser-delimiter");

@Injectable()
export class SerialService {

    private port: SerialPort2;

    private testNumber = 0;

    constructor() {
        this.port = new SerialPort2("/dev/ttyUSB0", { baudRate: 9600 }, function (error) {
            if (error) {
                console.log("Error opening serial port: " + error);
            }
        });

        const parser = this.port.pipe(new Delimiter({ delimiter: ";" }));
        parser.on("data", (data: Buffer) => {
            console.log("Data: " + data);

            const match = data.toString().match("b(\\d):([01])");
            if (!match) return;

            this.onButton(parseInt(match[1]), parseInt(match[2]) === 1);
        });
    }

    private onButton(number: number, pressed: boolean) {
        switch (number) {
            case 1:
                if (pressed) {
                    this.testNumber++;
                    this.updateDisplay();
                }

                break;
            default:
                break;
        }
    }

    private updateDisplay() {
        const a = Display.encodeNumber(this.testNumber);
        let data = "d1:".split("").map(char => char.charCodeAt(0));
        data.push(...a);
        data.push(";".charCodeAt(0));
        this.port.write(data)
    }
}
