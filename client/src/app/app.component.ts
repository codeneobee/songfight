import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { RoomService } from './services/room.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showHome = true;

  constructor(
    private socketService: SocketService,
    private roomService: RoomService,
    private gameService: GameService
  ) {
    this.socketService.setupSocketConnection();
    this.roomService.setupEventListener();
    this.gameService.setupStartGameEventListener();
  }

  ngOnInit() {
    this.roomService.users$.subscribe((users) => {
      if (users && users.length > 0) {
        this.showHome = false;
      }
    });
  }
}
