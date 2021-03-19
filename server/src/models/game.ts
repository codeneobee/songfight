import { PlayerSong } from "./player-song";
import { Room } from "./room";
import { SongMatchup } from "./song-matchup";

export function instantiateGame(room: Room): void {
  if (room.gameStarted) return;
  room.gameStarted = true;
  room.gameMatchups = createMatchups(room.songs);
}

function shuffleArray(array: unknown[]): unknown[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function createMatchups(songs: PlayerSong[]): SongMatchup[] {
  const pairArray: PlayerSong[] = shuffleArray(songs) as PlayerSong[];
  const matchupArray: SongMatchup[] = [];
  for (let i = 0; i < pairArray.length; i += 2) {
    matchupArray.push(new SongMatchup(pairArray[i], pairArray[i + 1]));
  }
  return matchupArray;
}
