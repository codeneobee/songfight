import {User} from './user';

export class Room {
    users = new Set<User>();
    songs = new Map<string, string>();

    constructor(public roomId: string) {
    }
}
