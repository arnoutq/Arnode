import { Application } from "./arnode/Application";
import { Router } from "./arnode/routing/Router";
import {Request} from "./arnode/http/Request";
import {RouteMatch} from "./arnode/routing/RouteMatch";
import {Response} from "./arnode/http/Response";

const app = new Application(new Router(new RouteMatch()));

app.get("/", ()=> { console.log("test1") }).middleware(() => { console.log("middleware1") });
app.get("/test/:id/:id2", (req: Request, res: Response)=> {
    res.html("<h1>test</h1>");
}).middleware(() => { console.log("middleware2") });

app.listen(8080);
