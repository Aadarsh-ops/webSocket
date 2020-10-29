import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as io from 'socket.io-client';
import { WebsocketService } from './websocket.service';
import { webSocket } from 'rxjs/webSocket'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  message = "hello";
  // messages: any[] = [{sender : 'admin', text : 'first'}];
  messages = {
    general: [],
    typescript: [],
    nestJs: []
  }
  rooms = {
    general: false,
    typescript: false,
    nestJs: false,
  }
  activeRoom = 'general';
  alerts: [];
  socket: any;
  username: string;
  // activeRoom: String = 'general';

  // changeActiveRoom(roomType: string): void{
  //   this.activeRoom = roomType;
  // }
  subject = webSocket('ws://localhost:8080');
  constructor(private websocketService: WebsocketService) {

  }

  sendMessage($event) {
    if (this.isMemberOfActiveRoom()) {
      this.socket.emit('chatToServer', { sender: this.username, text: this.message, room: this.activeRoom });
      this.message = "";
    } else {
      alert('you must be a member of active room to send messages');
    }
  }

  toggltRoomMembership() {
    if (this.isMemberOfActiveRoom()) {
      this.socket.emit('leaveRoom', this.activeRoom);
    } else {
      this.socket.emit('joinRoom', this.activeRoom);
    }
  }
  receviedMesssage(msg) {
    this.messages[msg.room].push(msg);
  }

  created() {
    this.username = prompt('enter your userName');

    this.socket = io('ws://localhost:8080/chat');
    this.socket.on('chatToClient', (msg) => {
      this.receviedMesssage(msg);
    })
    this.socket.on('connected', () => {
      this.toggltRoomMembership();
    })

    this.socket.on('joinedRoom', (room) => {
      this.rooms[room] = true;
    })
    this.socket.on('leftRoom', (room) => {
      this.rooms[room] = false;
    })
  }

  isMemberOfActiveRoom() {
    return this.rooms[this.activeRoom];
  }
  ngOnInit(): void {
    this.created();
    // this.websocketService.listen('test event').subscribe((data) => {
    //   console.log(data);
    // })
  }
}
