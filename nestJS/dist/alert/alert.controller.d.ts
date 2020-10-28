import { AlertGateway } from "./alert.gateway";
export declare class AppController {
    private alertGateway;
    constructor(alertGateway: AlertGateway);
    sendAlertToAll(dto: {
        message: string;
    }): {
        message: string;
    };
}
