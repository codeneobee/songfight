import { User } from './user';

export class Room {
    users = new Set<User>();
    songs = new Map<string, string>();
    gameStarted = false;

    constructor(public roomId: string) {
    }
}
