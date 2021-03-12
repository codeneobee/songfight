import { Socket } from 'socket.io';
import { User } from './models/user';
import { Room } from './models/room';
import { UsersDto } from './models/users-dto';
import { validateSpotifyLink } from './models/validateSpotify';

const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origins: "http://localhost:4200"
    }
});

const room = new Room('first')

io.on('connection', (socket: Socket) => {
    socket.on('newUser', (username: string) => {
        if (!username || username === '') return;

        if (Array.from(room.users).some(user => user.socketId == socket.id)) return

        socket.join(room.roomId)
        room.users.add(new User(socket.id, username))
        io.to(room.roomId).emit('users', UsersDto.createUsersDtoList(room))
    })

    socket.on('addSong', (link: string) => {
        const validatedLink = validateSpotifyLink(link);
        if (!validatedLink) return;

        room.songs.set([...room.users].find(user => user.socketId === socket.id).username, link)
        io.to(room.roomId).emit('users', UsersDto.createUsersDtoList(room))
    })


    socket.on('disconnect', () => {
        room.users.forEach(user => {
            if (user.socketId == socket.id) {
                room.users.delete(user)
                io.emit('users', Array.from(room.users).map(user => user.username))
            }
        })
    })
})

http.listen(3000, () => {
    console.log('Listening on port 3000')
})
