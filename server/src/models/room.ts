import { PlayerSong } from "./player-song";
import { shuffleArray } from "./shuffle-array";
import { SongMatchup } from "./song-matchup";
import { User } from "./user";

export class Room {
  users = new Set<User>();
  songs: PlayerSong[] = [];
  gameStarted = false;
  gameMatchups: SongMatchup[];

  constructor(public roomId: string) {}

  getUserBySocketId(socketId: string): User {
    return [...this.users].find((user: User) => user.socketId === socketId);
  }

  instantiateGame(): void {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.gameMatchups = this.createMatchups();
  }

  createMatchups(): SongMatchup[] {
    const pairArray: PlayerSong[] = shuffleArray(this.songs) as PlayerSong[];
    const matchupArray: SongMatchup[] = [];
    for (let i = 0; i < pairArray.length; i += 2) {
      matchupArray.push(new SongMatchup(pairArray[i], pairArray[i + 1]));
    }
    return matchupArray;
  }
}
