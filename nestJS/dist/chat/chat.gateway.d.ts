import { OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit {
    ws: Server;
    private logger;
    afterInit(server: Server): void;
    handleMessage(client: Socket, message: {
        sender: string;
        room: string;
        text: string;
    }): void;
    handelJoinRoom(client: Socket, room: string): void;
    handelLeaveRoom(client: Socket, room: string): void;
}
