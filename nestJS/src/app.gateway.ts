import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway(8080)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  wss: Server

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Intialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`);
  }


  @SubscribeMessage('megToServer')
  handleMessage(client: Socket, text: string): string {
    return text;
  //   console.log('loll',text);
  //   this.wss.emit('msgToClient', text);
  //  return { event: 'msgToClient', data: text};
  }
}
