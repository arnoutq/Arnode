export interface IRequest {
    query(parameterKey: string): false | string;
}

export class Request implements IRequest {
    private queryParameters: { [key: string]: string } = {};

    constructor(queryParameters: { [key: string]: string }) {
        this.queryParameters = queryParameters;
    }

    public query(parameterKey: string): false | string {
        if  (!(parameterKey in this.queryParameters)) {
            return false;
        }
        return this.queryParameters[parameterKey];
    }
}