import { Server } from "socket.io";
import { Room } from "../models/room";
import { SongMatchup } from "../models/song-matchup";

export class GameController {
  static instantiateMatchups(io: Server, room: Room): void {
    room.instantiateGame();
    io.to(room.roomId).emit(
      "startGame",
      room.gameMatchups.map((matchup: SongMatchup) =>
        matchup.toMatchupDto(room)
      )
    );
  }
}
