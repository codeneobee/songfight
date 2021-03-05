import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  users$ = new BehaviorSubject<string[]>([])

  constructor(public socketService: SocketService) {
  }

  setupEventListener() {
    this.socketService.listen('users').subscribe((users: string[]) => {
      this.users$.next(users)
    })
  }
}
