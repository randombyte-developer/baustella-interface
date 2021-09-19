import { DataProvider } from "./data-provider";

export enum ButtonState { NotPressed, Pressed };

export class Button extends DataProvider {

    private lastState = ButtonState.NotPressed;

    constructor(number: number, private onPressed: () => void) {
        super();

        this.tag = `b${number}`;
    }

    onNewData(data: string) {
        if (data.length != 1) return;

        switch (data) {
            case "0":
                this.lastState = ButtonState.NotPressed;
                break;

            case "1":
                if (this.lastState == ButtonState.NotPressed) {
                    this.onPressed();
                }
                this.lastState = ButtonState.Pressed;
                break;

            default:
                console.log("Invalid button state: " + data);
                break;
        }
    }
}
