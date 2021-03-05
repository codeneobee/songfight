import {Room} from './room';

export class UsersDto {
    constructor(
        public username: string,
        public ready: boolean
    ) {
    }

    static createUsersDtoList(room: Room) {
        return Array.from(room.users).map(user => {
            return {username: user.username, ready: !!room.songs.get(user.username)}
        })
    }
}
