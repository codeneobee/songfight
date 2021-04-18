import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSongDto } from '../user-list/user-song-dto';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  users$ = new BehaviorSubject<UserSongDto[]>([]);

  constructor(public socketService: SocketService) {}

  setupEventListener(): void {
    this.socketService.listen('users').subscribe((users: UserSongDto[]) => {
      this.users$.next(users);
    });
  }
}
