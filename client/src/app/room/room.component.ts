import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  linkInput = new FormControl('')
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }

  submitSpotifyLink() {
    this.socketService.emit('addSong', this.linkInput.value)
    this.linkInput.setValue('')
  }

  startGame() {
    this.socketService.emit('startGame', null)
  }
}
