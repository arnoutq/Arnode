export interface IRouter {
    addGet(path: string, callback: Function);
}

export class Router implements IRouter {
    private routes: Array<{path: string, callback: Function}> = [];

    constructor() {}

    public addGet(path: string, callback: Function) {
    }

}