import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(8080,{namespace : '/chat'})
export class ChatGateway implements OnGatewayInit {

  @WebSocketServer()
  ws: Server

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Intialized');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string,room: string, text: string}) {
    this.ws.to(message.room).emit('chatToClient', message);
    // client.broadcast.emit('chatToClient', message)
    // return { event: 'chatToClient', data: message};
  }

  @SubscribeMessage('joinRoom')
  handelJoinRoom(client: Socket, room: string){
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handelLeaveRoom(client: Socket, room: string){
    client.leave(room);
    client.emit('leftRoom', room);
  }

}