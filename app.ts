import { Application } from "./arnode/Application";
import { Router } from "./arnode/routing/Router";

const app = new Application(new Router());

app.get("/", ()=> { console.log("test1") });
app.get("/test/:id", ()=> { console.log("test2") });

app.listen(8080);
