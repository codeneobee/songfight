import { UserSongDto } from "./users-dto";

export class MatchupDto {
  constructor(public firstSong: UserSongDto, public secondSong: UserSongDto) {}
}
