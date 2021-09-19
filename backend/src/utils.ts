class Utils {
    static encodeText(text: string): number[] {
        if (text.length > 4) console.log(`Text is longer than 4 characters: ${text}`);

        text = Utils.padAndLimit(text, 4, " ");
        return [...text].map(this.encodeCharacter);
    }

    //
    //      A
    //     ---
    //  F |   | B
    //     -G-
    //  E |   | C
    //     ---
    //      D
    static encodeCharacter(character: string): number {
        if (character.length !== 1) throw `Only one character allowed: ${character}`;

        switch (character) {
            case " ":
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
            case "L":
                return 0b00111000;
            case "K":
                return 0b01110101;
            case "G":
                return 0b00111101;
            default:
                throw `No encoding found for character: ${character}`;
        }
    }

    private static padAndLimit(text: string, length: number, padding: string): string {
        return (text + padding.repeat(length)).substring(0, length);
    }
}
