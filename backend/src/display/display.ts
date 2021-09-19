import { Config } from "src/config/config";
import { ConfigService } from "src/config/config.service";
import { DataProvider } from "src/serial/data-provider";
import { Scale } from "src/serial/scale";
import { NavigationState, State } from "./state";

export class Display {

    constructor(
        private configService: ConfigService,
        private state: State,
        private dataProviders: DataProvider[],
        private updateText: (text: string) => void
    ) { }

    updateDisplay() {
        switch (this.state.navigation) {
            case NavigationState.ShowValue:
                const providers = this.dataProviders.filter(provider =>
                    provider instanceof Scale && (provider as Scale).number == this.state.selectedScaleIndex
                );
                if (providers.length !== 0) throw "Zero or more than one DataProviders matched!";
                
                const selectedScale = (providers[0] as Scale);
                const scaleConfig = this.getConfig().scales[selectedScale.number];

                const value = selectedScale.getAverage();

                const formattedValue = value.toFixed(1).replace(".", ""); // e.g. 12.34 -> "123"
                this.updateText(formattedValue + scaleConfig.unitSymbol);

                break;
        }
    }

    private getConfig(): Config {
        return this.configService.config;
    }
}
