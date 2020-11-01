import * as http from "http";
import { Router } from "./Routing/Router";
import { IncomingMessage, ServerResponse } from "http";

export interface IApplication {
    get(path: string, callback: Function): void;
    post(path: string, callback: Function): void;
    listen(port: number, host: string): void;
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

    private listener = (req: IncomingMessage, res: ServerResponse) => {
        const isValidMethod = this.router.isValidMethod(req.method);
        if (!isValidMethod) {
            res.writeHead(404);
            res.end("Not a valid method");
        }
    }

    public listen(port: number, host: string = "localhost"): void {
        const server = http.createServer(this.listener);
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }

}