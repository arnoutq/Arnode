import { Application } from "./arnode/Application";
import { Router } from "./arnode/Routing/Router";

const app = new Application(new Router());

app.get("/", ()=> {});

app.listen(8080);
