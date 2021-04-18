import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormControl } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  linkInput = new FormControl('');
  showGameComponent = false;
  constructor(
    private socketService: SocketService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.matchups$.subscribe((matchups) => {
      if (matchups.length < 1) {
        return;
      }
      this.showGameComponent = true;
    });
  }

  submitSpotifyLink(): void {
    this.socketService.emit('addSong', this.linkInput.value);
    this.linkInput.setValue('');
  }

  initializeGame(): void {
    this.socketService.emit('initializeGame');
  }
}
