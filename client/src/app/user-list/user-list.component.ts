import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.users$.subscribe(users => {
      this.users = users
    })
  }
}
