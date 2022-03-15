import * as messages from '@/messages.json';

export enum ResponseType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export class ApiResponse {

    protected type: ResponseType = ResponseType.SUCCESS; 
    protected message: string = messages.response.success;
    protected data: any = undefined;

    constructor(t: ResponseType, m?: string, d?: any) {
        this.type = t; this.message = m || this.message; this.data = d;
    }

}
