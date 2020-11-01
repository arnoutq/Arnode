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

    private isValidMethod(method: string): boolean {
        return Object.keys(this.routes).includes(method);
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

    private getMatchedRoute(method: string, path: string): Route | undefined {
        return this.routes[method].find((route: Route) => {
            return this.matchRoute(route, path);
        });
    }

    private call(callback: Function, parameters: { [key: string]: string }) {
        callback();
    }

    public run(method: string, path: string) {
        const isValidMethod = this.isValidMethod(method);
        if (!isValidMethod) {
            throw new Error("Method is not valid");
        }
        const matchedRoute = this.getMatchedRoute(method, path);
        if (!matchedRoute) {
            throw new Error("Route not found");
        }
        this.call(matchedRoute.getCallback(), matchedRoute.getParameters());
    }

}