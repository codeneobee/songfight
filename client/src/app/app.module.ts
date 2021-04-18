import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoomComponent } from './room/room.component';
import { GameComponent } from './game/game.component';
import { SongComponent } from './song/song.component';
import { CachedSrcDirective } from './directives/cached-src.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    RoomComponent,
    GameComponent,
    SongComponent,
    CachedSrcDirective,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
