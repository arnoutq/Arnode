export interface IRoute {
    setPath(path: string): void;
    getPath(): string;
    setCallback(callback: Function): void;
    getCallback(): Function;
}

export class Route implements IRoute {
    private path: string;
    private callback: Function;

    public setPath(path: string): void {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public setCallback(callback: Function): void {
        this.callback = callback;
    }

    public getCallback(): Function {
        return this.callback;
    }

}