import {Injectable} from '@angular/core';
import {io} from 'socket.io-client'
import {Observable} from 'rxjs';

const environment = {
  SOCKET_ENDPOINT: 'http://localhost:3000'
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;

  constructor() {
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT)
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }
}
