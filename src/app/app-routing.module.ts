import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddVideoComponent } from './add-video/add-video.component';

const routes: Routes = [
  {
    path: '',
    component: VideoPlayerComponent
  },
  {
    path: 'addVideo',
    component: AddVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
