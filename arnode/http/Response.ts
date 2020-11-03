import { ServerResponse } from "http";

export interface IResponse {
    html(htmlCode: string, statusCode: number): void;
    json(json: object, statusCode: number): void;
}

export class Response implements IResponse {
    private response: ServerResponse;

    constructor(response: ServerResponse) {
        this.response = response;
    }

    public html(htmlCode: string, statusCode: number = 200): void {
        const res = this.response;
        res.writeHead(statusCode, {'Content-Type': 'text/html'});
        res.write(htmlCode);
        res.end();
    }

    public json(json: object, statusCode: number = 200): void {
        const res = this.response;
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(json));
        res.end();
    }
}