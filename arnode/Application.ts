import * as http from "http";
import { Router } from "./routing/Router";
import { IncomingMessage, ServerResponse } from "http";
import {Route} from "./routing/Route";

export interface IApplication {
    get(path: string, callback: Function): void;
    post(path: string, callback: Function): void;
    listen(port: number, host: string): void;
}

export class Application implements IApplication {

    private router: Router;
    private activeRoute: Route;

    constructor(router: Router) {
        this.router = router;
    }

    public get(path: string, callback: Function): this {
        this.activeRoute = this.router.addGet(path, callback);
        return this;
    }

    public post(path: string, callback: Function): this {
        this.activeRoute = this.router.addPost(path, callback);
        return this;
    }

    public middleware(middleware: Function): void {
        this.activeRoute.setMiddleware(middleware);
    }

    private listener = (req: IncomingMessage, res: ServerResponse) => {
        this.router.run(req.method, req.url);
    }

    public listen(port: number, host: string = "localhost"): void {
        const server = http.createServer(this.listener);
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }

}