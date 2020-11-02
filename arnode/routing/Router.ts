import {Route} from "./Route";
import {Request} from "../http/Request";
import {RouteMatch} from "./RouteMatch";

export interface IRouter {
    addGet(path: string, callback: Function): void;
    addPost(path: string, callback: Function): void;
    run(method: string | undefined, path: string | undefined): void;
}

export class Router implements IRouter {
    private routes: { GET: Array<Route>, POST: Array<Route>} = {GET: [], POST: []};
    private routeMatch: RouteMatch;

    constructor(routeMatch: RouteMatch) {
        this.routeMatch = routeMatch;
    }

    public addGet(path: string, callback: Function): void {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);
        this.routes.GET.push(route);
    }

    public addPost(path: string, callback: Function): void {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);
        this.routes.POST.push(route);
    }

    private getValidMethod(method: string): "GET" | "POST" | false {
        const isValidMethod = Object.keys(this.routes).includes(method);
        if (!isValidMethod) {
            return false;
        }
        return method as "GET" | "POST";
    }

    private call(callback: Function, parameters: { [key: string]: string }) {
        const request = new Request(parameters);
        callback(request);
    }

    public run(method: string | undefined, path: string | undefined) {
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
            throw new Error("Route not found");
        }
        this.call(matchedRoute.getCallback(), matchedRoute.getParameters());
    }

}