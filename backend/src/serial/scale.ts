import CBuffer from "CBuffer";
import { ConfigService } from "src/config/config.service";
import { ScaleConfig } from "src/config/scale-config";
import { DataProvider } from "./data-provider";

export class Scale extends DataProvider {

    private lastData = new CBuffer(10);

    constructor(public number: number, private configService: ConfigService, private onNewValue: (valueKg: number) => void) {
        super();

        this.tag = `s${number}`;
    }

    onNewData(data: string) {
        const rawValue = parseInt(data);
        if (rawValue === NaN) {
            console.log(`Not a valid int: ${data}`);
            return;
        }

        const config = this.getConfig();
        const valueWithoutOffset = rawValue - config.offsetTicks;
        const kgValue = valueWithoutOffset / config.ticksPerKg;
        const unitValue = kgValue / config.kgPerUnit;

        this.lastData.push(kgValue);
        this.onNewValue(this.getAverage());
    }

    public getAverage(): number {
        return this.lastData.avg();
    }

    private getConfig(): ScaleConfig {
        return this.configService.config.scales[this.number];
    }
}
