import { EcCommunicationService, EcResponse } from "./communication.service";
import { SETTINGS } from "../private.settings";

class EcAPISingleton {

    private static _instance: EcAPISingleton;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    public logIn(id: string, password: string): Promise<EcResponse> {
        return EcCommunicationService.post(SETTINGS.LOG_IN, {
            id, password
        });
    }

    public logOut(): Promise<EcResponse> {
        return EcCommunicationService.get(SETTINGS.LOG_OUT);
    }

}

export const EcAPI = EcAPISingleton.Instance;
