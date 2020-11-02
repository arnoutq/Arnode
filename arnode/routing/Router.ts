import {Route} from "./Route";
import {Request} from "../http/Request";
import {RouteMatch} from "./RouteMatch";
import {ServerResponse} from "http";
import {Response} from "../http/Response";

export interface IRouter {
    addGet(path: string, callback: Function): void;
    addPost(path: string, callback: Function): void;
    run(method: string | undefined, path: string | undefined, res: ServerResponse): void;
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

    private call(middleware: Function | undefined, callback: Function, parameters: { [key: string]: string } | {}, res: ServerResponse) {
        if (typeof middleware === "function") {
            middleware();
        }
        const request = new Request(parameters);
        const response = new Response(res);
        return callback(request, response);
    }

    public run(method: string | undefined, path: string | undefined, res: ServerResponse) {
        if (!path) {
            throw new Error("path is not defined");
        }
        if (!method) {
            throw new Error("Method is not defined");
        }

        const validMethod = this.getValidMethod(method);
        if (!validMethod) {
            throw new Error("Method is not valid");
        }
        const matchedRoute = this.routeMatch.getMatchedRoute(this.routes, validMethod, path);
        if (!matchedRoute) {
            throw new Error("Route not found: " + path);
        }
        this.call(matchedRoute.getMiddleware(), matchedRoute.getCallback(), matchedRoute.getParameters(), res);
    }

}