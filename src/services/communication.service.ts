import { RequestMethod, EcResponseType } from "../enum/communication.enum";

type EcRequestOptions = {
    url: string;
    method: RequestMethod;
    payload: Record<string, string>;
}

type EcResponse = {
    type: EcResponseType;
    data: Record<string, string>;
    message: string;
}

class EcRequest {

    private url: string;
    private method: RequestMethod;
    private abortController: AbortController;
    private payload: string;

    public cancelled = false;
    public shortSignature: string;
    public fullSignature: string;
    private _result: Promise<EcResponse> | null = null;

    get result() {
        if (!this._result) {
            this._result = this.perform();
        }
        return this._result;
    }

    constructor(options: EcRequestOptions) {
        this.url = options.url;
        this.method = options.method;
        this.abortController = new AbortController();
        this.payload = JSON.stringify(options.payload);
        this.shortSignature = this.method + this.url;
        this.fullSignature = this.shortSignature + this.payload;
    }

    private composeResult(type: EcResponseType, response: Record<string, string>): EcResponse {
        switch(type) {
            case EcResponseType.ok:
                return {
                    type: EcResponseType.ok,
                    data: response,
                    message: ''
                };
            default:
                return {
                    type: this.cancelled ? EcResponseType.cancelled : EcResponseType.error,
                    data: response,
                    message: response.message || ''
                }
        }
    }

    private async perform(): Promise<EcResponse> {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                body: this.payload,
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            return this.composeResult(EcResponseType.error, response);
        } catch(e) {
            return this.composeResult(EcResponseType.error, e);
        }
    }

    public cancel() {
        this.abortController.abort();
        this.cancelled = true;
    }
}

class CommunicationServiceSingleton {
    private static _instance: CommunicationServiceSingleton;
    private requests: Array<EcRequest> = [];

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private removeFromPool(index: number) {
        if (index > -1) {
            this.requests.splice(index, 1);
        }
    }

    public async makeRequest(url: string, method: string, payload: Record<string, string>): Promise<EcResponse> {
        const request = new EcRequest({url, method: (method as RequestMethod), payload});
        const sameRequest = this.requests.find(r => r.fullSignature === request.fullSignature);

        if (sameRequest) {
            return sameRequest.result;
        }

        const obsoleteRequestIndex = this.requests.findIndex(r => r.shortSignature === request.shortSignature);

        if (obsoleteRequestIndex > -1) {
            this.requests[obsoleteRequestIndex].cancel();
            this.removeFromPool(obsoleteRequestIndex);
        }

        const result = request.result;

        result.then(() => {
            this.removeFromPool(this.requests.indexOf(request));
        });

        return result;
    }
}

export const EcCommunicationService = CommunicationServiceSingleton.Instance;