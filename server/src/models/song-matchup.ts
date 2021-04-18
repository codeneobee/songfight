import { MatchupDto } from "./matchup-dto";
import { PlayerSong } from "./player-song";
import { Room } from "./room";
import { UserSongDto } from "./users-dto";

export class SongMatchup {
  constructor(public firstSong: PlayerSong, public secondSong: PlayerSong) {}

  toMatchupDto(room: Room): MatchupDto {
    return new MatchupDto(
      new UserSongDto(
        room.getUserBySocketId(this.firstSong.playerSocketId).username,
        this.firstSong.songLink
      ),
      new UserSongDto(
        room.getUserBySocketId(this.secondSong.playerSocketId).username,
        this.secondSong.songLink
      )
    );
  }
}
