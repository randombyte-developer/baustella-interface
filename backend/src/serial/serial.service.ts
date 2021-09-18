import { Injectable } from '@nestjs/common';
import * as SerialPort2 from 'serialport';

const Delimiter = require("@serialport/parser-delimiter");

@Injectable()
export class SerialService {

    private port: SerialPort2;

    constructor() {
        this.port = new SerialPort2("/dev/ttyUSB0", { baudRate: 9600 }, function (error) {
            if (error) {
                console.log("Error opening serial port: " + error);
            }
        });

        const parser = this.port.pipe(new Delimiter({ delimiter: ";" }));
        parser.on("data", function (data) {
            console.log("Data: " + data);
        });
    }
}
