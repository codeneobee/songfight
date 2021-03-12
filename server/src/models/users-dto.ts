import { Room } from './room';

export class UsersDto {
    constructor(
        public username: string,
        public song: string
    ) {
    }

    static createUsersDtoList(room: Room) {
        return Array.from(room.users).map(user => {
            return { username: user.username, song: room.songs.get(user.socketId) }
        })
    }
}
