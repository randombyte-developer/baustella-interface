import { DataProvider } from "./data-provider";

export enum State { NotPressed, Pressed };

export class Button extends DataProvider {

    private lastState = State.NotPressed;

    constructor(number: number, private onPressed: () => void) {
        super();

        this.tag = "b" + number;
    }

    override onNewData(data: string) {
        if (data.length != 1) return;

        switch (data) {
            case "0":
                this.lastState = State.NotPressed;
                break;

            case "1":
                if (this.lastState == State.NotPressed) {
                    this.onPressed();
                }
                this.lastState = State.Pressed;
                break;

            default:
                console.log("Warning: Invalid button state: " + data);
                break;
        }
    }
}
