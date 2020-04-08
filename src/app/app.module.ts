import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlayerControlComponent } from './player-control/player-control.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    VideoPlayerComponent,
    PlayerControlComponent,
    AddVideoComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
