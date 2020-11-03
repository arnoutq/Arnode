import {IncomingMessage} from "http";

export interface IRequest {
    query(parameterKey: string): false | string;
}

export class Request implements IRequest {
    private queryParameters: { [key: string]: string } = {};
    private request: IncomingMessage;
    private body: string | '';

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}, body: string | '') {
        this.request = request;
        this.queryParameters = queryParameters;
        this.body = body;
    }

    public query(parameterKey: string): false | string {
        if  (!(parameterKey in this.queryParameters)) {
            return false;
        }
        return this.queryParameters[parameterKey];
    }
}