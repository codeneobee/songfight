import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GameService, MatchupDto } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  matchups: MatchupDto[];
  currentIndex: number;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.matchups$.subscribe((matchups: MatchupDto[]) => {
      this.matchups = matchups;
      this.currentIndex = 0;
    });
  }
}
