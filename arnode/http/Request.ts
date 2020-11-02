export interface IRequest {
    setQueryParameters(queryParameters: { [key: string]: string }): void;
    query(parameterKey: string): false | string;
}

export class Request implements IRequest {
    private queryParameters: { [key: string]: string } = {};

    public setQueryParameters(queryParameters: { [key: string]: string }): void {
        this.queryParameters = queryParameters;
    }

    public query(parameterKey: string): false | string {
        if  (!(parameterKey in this.queryParameters)) {
            return false;
        }
        return this.queryParameters[parameterKey];
    }
}