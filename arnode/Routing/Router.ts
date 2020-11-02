import {Route} from "./Route";

export interface IRouter {
    addGet(path: string, callback: Function): void;
    addPost(path: string, callback: Function): void;
    run(method: string, path: string): void;
}

export class Router implements IRouter {
    private routes: { GET: Array<Route>, POST: Array<Route>} = {GET: [], POST: []};

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

    private matchRoute(route: Route, requestPath: string) {
        const pathPieces = route.getPath().substring(1).split("/");
        const requestPathPieces = requestPath.substring(1).split("/");

        if (pathPieces.length != requestPathPieces.length) {
            return false;
        }

        return pathPieces.every((pathPiece: string, index: number) => {
            if (pathPiece.includes(":")) {
                const parameterKey = pathPiece.substring(1);
                const parameterValue = requestPathPieces[index];
                route.setParameter(parameterKey, parameterValue);
                return true;
            }
            return pathPiece === requestPathPieces[index];
        });
    }

    private getMatchedRoute(method: "GET" | "POST", path: string): Route | undefined | false {
        return this.routes[method].find((route: Route) => {
            return this.matchRoute(route, path);
        });
    }

    private call(callback: Function, parameters: { [key: string]: string }) {
        callback();
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
        const matchedRoute = this.getMatchedRoute(validMethod, path);
        if (!matchedRoute) {
            throw new Error("Route not found");
        }
        this.call(matchedRoute.getCallback(), matchedRoute.getParameters());
    }

}