export interface IRoute {
    setPath(path: string): void;
    getPath(): string;
    setCallback(callback: Function): void;
    getCallback(): Function;
    setParameter(parameterKey: string, parameterValue: string): void;
    getParameters(): { [key: string]: string };
}

export class Route implements IRoute {
    private path: string;
    private callback: Function;
    private parameters: { [key: string]: string };

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

    public setParameter(parameterKey: string, parameterValue: string): void {
        this.parameters[parameterKey] = parameterValue;
    }

    public getParameters(): { [key: string]: string } {
        return this.parameters;
    }

}