import {Component, OnInit} from '@angular/core';
import {SocketService} from '../services/socket.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = new FormControl('')

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
  }

  sendUsernameEvent() {
    this.socketService.emit('newUser', this.username.value)
  }
}
