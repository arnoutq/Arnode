import { Application } from "./arnode/Application";
import { Router } from "./arnode/routing/Router";
import {Request} from "./arnode/http/Request";

const app = new Application(new Router());

app.get("/", ()=> { console.log("test1") });
app.get("/test/:id", (req: Request)=> { console.log(req.query("id")) });

app.listen(8080);
