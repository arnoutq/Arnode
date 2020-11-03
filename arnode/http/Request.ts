import {IncomingMessage} from "http";
import qs from 'qs';
import QueryString from "qs";

export interface IRequest {
    query(parameterKey: string): false | string;
}

export class Request implements IRequest {
    private queryParameters: { [key: string]: string } = {};
    private request: IncomingMessage;
    public body: QueryString.ParsedQs;

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}, body: string | '') {
        this.request = request;
        this.queryParameters = queryParameters;
        this.body = qs.parse(body);
    }

    public query(parameterKey: string): false | string {
        if  (!(parameterKey in this.queryParameters)) {
            return false;
        }
        return this.queryParameters[parameterKey];
    }
}