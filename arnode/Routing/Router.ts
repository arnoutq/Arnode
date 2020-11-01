import {Route} from "./Route";

export interface IRouter {
    addGet(path: string, callback: Function);
    addPost(path: string, callback: Function);
}

export class Router implements IRouter {
    private routes: { GET: Array<Route>, POST: Array<Route>} = {GET: [], POST: []};

    public addGet(path: string, callback: Function) {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);

        this.routes.GET.push(route);
    }

    public addPost(path: string, callback: Function) {
        const route = new Route();
        route.setPath(path);
        route.setCallback(callback);

        this.routes.POST.push(route);
    }

}