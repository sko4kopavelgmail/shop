export class CommonResponse {
    body: any;
    processedBy: string;
    ms: number;

    constructor(body: any, processedBy: string, ms: number) {
        this.body = body;
        this.processedBy = processedBy;
        this.ms = ms;
    }

    static serialize(obj: any): CommonResponse {
        return new CommonResponse(obj.body, obj.processedBy, obj.ms);
    }

}