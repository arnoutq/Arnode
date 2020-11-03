import {IncomingMessage} from "http";
import qs from 'qs';
import QueryString from "qs";

export class Request {
    private request: IncomingMessage;
    public query: { [key: string]: string } = {};
    public body: QueryString.ParsedQs | { [key: string]: any };

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}, body: string | '') {
        this.request = request;
        this.query = queryParameters;
        this.body = this.parseBody(body);
    }

    private parseBody(body: string): QueryString.ParsedQs | { [key: string]: any }{
        const isJson = this.isJson(body);
        if (isJson) {
            return JSON.parse(body);
        }
        return qs.parse(body);
    }

    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}