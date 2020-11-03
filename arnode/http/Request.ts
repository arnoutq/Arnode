import { IncomingMessage } from "http";
import qs from 'qs';
import QueryString from "qs";

export class Request {
    private request: IncomingMessage;
    public query: { [key: string]: string } = {};
    public body: QueryString.ParsedQs | { [key: string]: any };

    constructor(request: IncomingMessage, queryParameters: { [key: string]: string } | {}, body: string | '') {
        this.request = request;
        this.query = queryParameters;
        if (request.headers['content-type']) {
            this.body = this.parseBody(request.headers['content-type'], body);
        }
    }

    private parseBody(contentType: string, body: string): QueryString.ParsedQs | { [key: string]: any }{
        if (contentType === 'application/json') {
            try {
                return JSON.parse(body);
            } catch (e) {
                return {};
            }
        }
        if (contentType === 'application/x-www-form-urlencoded') {
            return qs.parse(body);
        }
        return {};
    }
}