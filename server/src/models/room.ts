import { PlayerSong } from "./player-song";
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
}
