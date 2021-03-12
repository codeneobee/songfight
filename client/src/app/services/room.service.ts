import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../user-list/UserDto';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  users$ = new BehaviorSubject<UserDto[]>([]);

  constructor(public socketService: SocketService) {
  }

  setupEventListener(): void {
    this.socketService.listen('users').subscribe((users: UserDto[]) => {
      this.users$.next(users);
    });
  }
}
