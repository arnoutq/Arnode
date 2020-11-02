import { Application } from "./arnode/Application";
import { Router } from "./arnode/routing/Router";
import {Request} from "./arnode/http/Request";
import {RouteMatch} from "./arnode/routing/RouteMatch";

const app = new Application(new Router(new RouteMatch()));

app.get("/", ()=> { console.log("test1") }).middleware(() => { console.log("middleware1") });
app.get("/test/:id/:id2", (req: Request)=> {
    console.log(req.query("id"));
    console.log(req.query("id2"));
}).middleware(() => { console.log("middleware2") });

app.listen(8080);
