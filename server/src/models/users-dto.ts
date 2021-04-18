import { PlayerSong } from "./player-song";
import { Room } from "./room";
import { User } from "./user";

export class UserSongDto {
  constructor(public username: string, public song: string) {}

  static createUsersDtoList(room: Room): UserSongDto[] {
    return Array.from(room.users).map(
      (user: User) =>
        new UserSongDto(
          user.username,
          room.songs.find(
            (song: PlayerSong) => song.playerSocketId === user.socketId
          )?.songLink
        )
    );
  }
}
