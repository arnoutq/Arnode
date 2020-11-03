import { Route } from "./Route";
import { Request } from "../http/Request";
import { RouteMatch } from "./RouteMatch";
import { IncomingMessage, ServerResponse } from "http";
import { Response } from "../http/Response";

export interface IRouter {
    addGet(path: string, callback: Function): void;
    addPost(path: string, callback: Function): void;
    run(req: IncomingMessage, res: ServerResponse, body: string | ''): false | void;
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

    private getPath(path: string | undefined): string {
        if (!path) {
            throw new Error("path is not defined");
        }
        return path;
    }

    private getMethod(method: string | undefined): "GET" | "POST" {
        if (!method) {
            throw new Error("Method is not defined");
        }
        const isValidMethod = Object.keys(this.routes).includes(method);
        if (!isValidMethod) {
            throw new Error("Method is not valid");
        }
        return method as "GET" | "POST";
    }

    private getRequestClass(req: IncomingMessage, parameters: { [key: string]: string } | {}, body: string | ''): Request {
        return new Request(req, parameters, body);
    }

    private getResponseClass(res: ServerResponse): Response {
        return new Response(res);
    }

    private call(middleware: Function | undefined, callback: Function, request: Request, response: Response): Function {
        if (typeof middleware === "function") {
            middleware();
        }
        return callback(request, response);
    }

    public run(req: IncomingMessage, res: ServerResponse, body: string | ''): false | void {
        const path = this.getPath(req.url);
        const method = this.getMethod(req.method);
        if (method !== "GET" && !body) {
            return false;
        }

        const matchedRoute = this.routeMatch.getMatchedRoute(this.routes, method, path);
        const request = this.getRequestClass(req, matchedRoute.getParameters(), body);
        const response = this.getResponseClass(res);

        this.call(matchedRoute.getMiddleware(), matchedRoute.getCallback(), request, response);
    }

}