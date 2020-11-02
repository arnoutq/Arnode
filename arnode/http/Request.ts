import {IncomingMessage} from "http";

export interface IRequest {
    query(parameterKey: string): false | string;
}

export class Request implements IRequest {
    private queryParameters: { [key: string]: string } = {};
    private request: IncomingMessage;

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}) {
        this.request = request;
        this.queryParameters = queryParameters;
    }

    public query(parameterKey: string): false | string {
        if  (!(parameterKey in this.queryParameters)) {
            return false;
        }
        return this.queryParameters[parameterKey];
    }
}