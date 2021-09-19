import { ScaleConfig } from "./scale-config";
import { TaraConfig } from "./tara-config";

export class Config {
    // default config
    public scales: { [number: number]: ScaleConfig } = {
        0: new ScaleConfig(
            225_000,
            100_000,
            1.050,
            " ",
            {
                "10-liters": new TaraConfig("10 Liter Fass", "10L", 4.6),
                "30-liters": new TaraConfig("30 Liter Fass", "30L", 4.6),
            }
        ),
        1: new ScaleConfig(
            225_000,
            100_000,
            1, // the unit already is kg -> factor of 1
            " ",
            {
                "10-kg": new TaraConfig("10 kg Flasche", "10KG", 21)
            }
        )
    }
}
