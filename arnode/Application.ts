import { Router } from "./Routing/Router";

export interface IApplication {
    get(path: string, callback: Function): void;
    post(path: string, callback: Function): void;
}

export class Application implements IApplication {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public get(path: string, callback: Function): void {
        this.router.addGet(path, callback);
    }

    public post(path: string, callback: Function): void {
        this.router.addPost(path, callback);
    }

}