import { Application } from "./arnode/Application";
import { Router } from "./arnode/routing/Router";
import {Request} from "./arnode/http/Request";
import {RouteMatch} from "./arnode/routing/RouteMatch";
import {Response} from "./arnode/http/Response";

const app = new Application(new Router(new RouteMatch()));

app.get("/", (req: Request, res: Response)=> {
    res.html("<form method='POST' action='/test'><input name='testform'><input name='testform2'><button type='submit'>Submit</button></form>");
});
app.post("/test", (req: Request)=> { console.log(req.body.testform) });
app.get("/middleware", ()=> { console.log("test") }).middleware(() => { console.log("middleware") });

app.listen(8080);
