import { TaraConfig } from "./tara-config";

export class ScaleConfig {
    constructor(
        public offsetTicks: number,
        public ticksPerKg: number,
        public kgPerUnit: number, // unit meaning liters or kg again (factor = 1)
        public unitSymbol: string,
        public taras: { [id: string]: TaraConfig }
    ) { }
}
