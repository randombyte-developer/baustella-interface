export abstract class DataProvider {

    protected tag: string

    offerData(data: string) {
        const match = data.match(`${this.tag}:(.*)`);
        if (match) this.onNewData(match[1]);
    }

    abstract onNewData(data: string);
}
