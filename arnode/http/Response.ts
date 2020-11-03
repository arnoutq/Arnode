import {ServerResponse} from "http";

export interface IResponse {
    html(htmlCode: string): void;
}

export class Response implements IResponse {
    private response: ServerResponse;

    constructor(response: ServerResponse) {
        this.response = response;
    }

    public html(htmlCode: string): void {
        const res = this.response;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(htmlCode);
        res.end();
    }

    public json(json: object): void {
        const res = this.response;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(json));
        res.end();
    }
}