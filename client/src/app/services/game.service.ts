import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSongDto } from '../user-list/user-song-dto';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public matchups$ = new BehaviorSubject<MatchupDto[]>([]);

  constructor(private socketService: SocketService) {}

  setupStartGameEventListener(): void {
    this.socketService
      .listen('startGame')
      .subscribe((matchups: MatchupDto[]) => {
        this.matchups$.next(matchups);
      });
  }
}

export class MatchupDto {
  firstSong: UserSongDto;
  secondSong: UserSongDto;

  equals(otherMatchup: MatchupDto): boolean {
    return (
      this.firstSong.equals(otherMatchup.firstSong) &&
      this.secondSong.equals(otherMatchup.secondSong)
    );
  }
}
