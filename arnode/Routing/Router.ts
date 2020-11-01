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

    private getMatchedRoute(method: string, path: string) {
        return this.routes[method].find((route: Route) => {
            return route.getPath() === path;
        });
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
    }

}