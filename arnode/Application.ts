export interface IApplication {
    get(path: string, callback: Function);
}

export class Application implements IApplication {
    constructor() {}

    public get(path: string, callback: Function) {

    }

}