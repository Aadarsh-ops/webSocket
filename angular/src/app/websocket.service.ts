import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  socket: any;
  readonly url: string = 'ws://localhost:8080';

  constructor() { 
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
    }
    emit(eventName: string, data: any){
      this.socket.emit(eventName, data);
  }
}




// import { Injectable } from '@angular/core';
// import { Observable, Observer } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import * as socketIo from 'socket.io-client';

// import { Socket } from './interface';

// declare var io : {
//   connect(url: string): Socket;
// };

// @Injectable()
// export class WebsocketService {

//   socket: Socket;
//   observer: Observer<number>;

//   getQuotes() : Observable<number> {
//     this.socket = socketIo('ws://localhost:8080');

//     this.socket.on('data', (res) => {
//       this.observer.next(res.data);
//     });

//     return this.createObservable();
//   }

//   createObservable() : Observable<number> {
//       return new Observable<number>(observer => {
//         this.observer = observer;
//       });
//   }

//   private handleError(error) {
//     console.error('server error:', error);
//     if (error.error instanceof Error) {
//         let errMessage = error.error.message;
//         return Observable.throw(errMessage);
//     }
//     return Observable.throw(error || 'Socket.io server error');
//   }

// }
