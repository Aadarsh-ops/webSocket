import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'ws';
export declare class EventsGateway {
    server: Server;
    onEvent(client: any, data: any): Observable<WsResponse<number>>;
}
