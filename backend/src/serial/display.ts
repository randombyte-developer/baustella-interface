export class Display {
    static encodeNumber(number: number): number[] {
        const string = number.toString();
        const length = string.length;

        const digit = string.charAt(length - 1);
        const encoded = this.encodeDigit(digit);

        return [encoded, encoded, encoded, encoded];
    }

    static encodeDigit(digit: string): number {
        switch (digit) {
            case "":
                return 0b00000000;
            case "0":
                return 0b00111111;
            case "1":
                return 0b00000110;
            case "2":
                return 0b01011011;
            case "3":
                return 0b01001111;
            case "4":
                return 0b01100110;
            case "5":
                return 0b01101101;
            case "6":
                return 0b01111101;
            case "7":
                return 0b00000111;
            case "8":
                return 0b01111111;
            case "9":
                return 0b01101111;
            default:
                throw "Digit must be between 0..9!"
        }
    }
}
