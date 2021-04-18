export class UserSongDto {
  username: string;
  song: string;

  equals(otherSong: UserSongDto): boolean {
    return this.username === otherSong.username && this.song === otherSong.song;
  }
}
