import { Server } from "socket.io";
import * as Game from "../models/game";
import { MatchupDto } from "../models/matchup-dto";
import { Room } from "../models/room";
import { SongMatchup } from "../models/song-matchup";
import { UserSongDto } from "../models/users-dto";

export class GameController {
  static instantiateMatchups(io: Server, room: Room): void {
    Game.instantiateGame(room);
    io.to(room.roomId).emit(
      "startGame",
      room.gameMatchups.map((matchup: SongMatchup) => {
        return new MatchupDto(
          new UserSongDto(
            room.getUserBySocketId(matchup.firstSong.playerSocketId).username,
            matchup.firstSong.songLink
          ),
          new UserSongDto(
            room.getUserBySocketId(matchup.secondSong.playerSocketId).username,
            matchup.secondSong.songLink
          )
        );
      })
    );
  }
}
