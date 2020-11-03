import {IncomingMessage} from "http";
import qs from 'qs';
import QueryString from "qs";

export class Request {
    private request: IncomingMessage;
    public query: { [key: string]: string } = {};
    public body: QueryString.ParsedQs;

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}, body: string | '') {
        this.request = request;
        this.query = queryParameters;
        this.body = qs.parse(body);
    }
}