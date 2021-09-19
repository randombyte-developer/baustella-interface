import { Config } from "src/config/config";
import { ConfigService } from "src/config/config.service";

export enum NavigationState { ShowValue };

export class State {

    public navigation = NavigationState.ShowValue;
    public selectedScaleIndex = 0;

    constructor(private configService: ConfigService, private updatedState: () => void) {

    }

    pressedPlus() {
        this.select(1);
    }

    pressedMinus() {
        this.select(-1);
    }

    private select(offset: number) {
        const scalesCount = Object.keys(this.getConfig().scales).length;
        this.selectedScaleIndex = (this.selectedScaleIndex + scalesCount + offset) % scalesCount; // wraps around

        this.updatedState();
    }

    pressedEnter() {
        
    }

    newScaleValue(scaleIndex: number, value: number) {

    }

    private getConfig(): Config {
        return this.configService.config;
    }
}
