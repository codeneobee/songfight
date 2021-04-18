import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { RoomService } from '../services/room.service';
import { UserSongDto } from './user-song-dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: UserSongDto[];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.users$.subscribe((users) => {
      this.users = users;
    });
  }
}
