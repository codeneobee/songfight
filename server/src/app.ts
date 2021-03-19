import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { GameController } from "./controllers/GameController";
import { PlayerSong } from "./models/player-song";
import { Room } from "./models/room";
import { User } from "./models/user";
import { UserSongDto } from "./models/users-dto";
import { validateSpotifyLink } from "./models/validateSpotify";

const app = express();
const httpApp = http.createServer(app);
const io = new Server(httpApp, {
  cors: { origin: "http://localhost:4200" },
});

const room = new Room("first");

const MAX_PLAYERS = 8;

if (process.env.DEV_ENV) {
  for (let index = 0; index < 7; index++) {
    room.users.add(new User(String(index), "TestUser" + index));
    room.songs.push(
      new PlayerSong(
        String(index),
        "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=495a138ab70142cc"
      )
    );
  }
}

io.on("connection", (socket: Socket) => {
  socket.on("newUser", (username: string) => {
    if (!username || username === "") return;

    if (
      Array.from(room.users).some((user: User) => user.socketId === socket.id)
    )
      return;

    socket.join(room.roomId);
    room.users.add(new User(socket.id, username));
    io.to(room.roomId).emit("users", UserSongDto.createUsersDtoList(room));
  });

  socket.on("addSong", (link: string) => {
    const validatedLink = validateSpotifyLink(link);
    if (!validatedLink) return;

    room.songs.push(
      new PlayerSong(room.getUserBySocketId(socket.id).socketId, link)
    );
    io.to(room.roomId).emit("users", UserSongDto.createUsersDtoList(room));
  });

  socket.on("startGame", () => {
    if (room.songs.length !== MAX_PLAYERS) return;

    GameController.instantiateMatchups(io, room);
  });

  socket.on("disconnect", () => {
    room.users.forEach((user: User) => {
      if (user.socketId === socket.id) {
        room.users.delete(user);
        io.emit(
          "users",
          Array.from(room.users).map((roomUser: User) => roomUser.username)
        );
      }
    });
  });
});

httpApp.listen(3000, () => {
  // tslint:disable-next-line
  console.log("Listening on port 3000");
});
