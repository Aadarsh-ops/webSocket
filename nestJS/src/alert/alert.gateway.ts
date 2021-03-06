import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({namespace: '/alert '})
export class AlertGateway {

  @WebSocketServer()
  wss: Server

  sendToAll(msg: string){
   this.wss.emit('alertToClient', {type: 'Alert', message: msg});
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}
