import {Route} from "./Route";
import {Request} from "../http/Request";
import {RouteMatch} from "./RouteMatch";
import {IncomingMessage, ServerResponse} from "http";
import {Response} from "../http/Response";

export interface IRouter {
    addGet(path: string, callback: Function): void;
    addPost(path: string, callback: Function): void;
    run(req: IncomingMessage, res: ServerResponse, body: string | undefined): void;
}

export class Router implements IRouter {
    private routes: { GET: Array<Route>, POST: Array<Route>} = {GET: [], POST: []};
    private routeMatch: RouteMatch;

    constructor(routeMatch: RouteMatch) {
        this.routeMatch = routeMatch;
    }

    public addGet(path: string, callback: Function): Route {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);
        this.routes.GET.push(route);

        return route;
    }

    public addPost(path: string, callback: Function): Route {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);
        this.routes.POST.push(route);

        return route;
    }

    private getValidMethod(method: string): "GET" | "POST" | false {
        const isValidMethod = Object.keys(this.routes).includes(method);
        if (!isValidMethod) {
            return false;
        }
        return method as "GET" | "POST";
    }

    private call(middleware: Function | undefined, callback: Function, request: Request, response: Response) {
        if (typeof middleware === "function") {
            middleware();
        }
        return callback(request, response);
    }

    private getRequestClass(req: IncomingMessage, parameters: { [key: string]: string } | {}, body: string | '') {
        return new Request(req, parameters, body);
    }

    private getResponseClass(res: ServerResponse) {
        return new Response(res);
    }

    public run(req: IncomingMessage, res: ServerResponse, body: string | '') {
        const path = req.url;
        const method = req.method;
        if (!path) {
            throw new Error("path is not defined");
        }
        if (!method) {
            throw new Error("Method is not defined");
        }
        if (method !== "GET" && !body) {
            return false;
        }

        const validMethod = this.getValidMethod(method);
        if (!validMethod) {
            throw new Error("Method is not valid");
        }
        const matchedRoute = this.routeMatch.getMatchedRoute(this.routes, validMethod, path);
        if (!matchedRoute) {
            throw new Error("Route not found: " + path);
        }

        const request = this.getRequestClass(req, matchedRoute.getParameters(), body);
        const response = this.getResponseClass(res);

        this.call(matchedRoute.getMiddleware(), matchedRoute.getCallback(), request, response);
    }

}