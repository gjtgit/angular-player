import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Video } from '../video';
import { PlayerComponent } from '../player/player.component';
import { VideoSrvService } from '../video-srv.service';
import $ from "jquery";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  selectedVideo: Video; //from player-list 
  //use @ViewChild to get the child component or call child's methods, and the template var name should be set by #xxxx.
  @ViewChild('player',{static:true}) playerModule:any
  @ViewChild('playerControl',{static:true}) playerControlModule:any
  
  constructor(private videoSrv:VideoSrvService) { }
  
  ngOnInit() {
    if(localStorage.react_lastPlayVideoId){
			console.log(" get lastPlayVideoId = "+localStorage.react_lastPlayVideoId);
      this.videoSrv.getVideo(localStorage.react_lastPlayVideoId)
          .subscribe(video => {
            this.selectedVideo = video;
            //const videoElement = this.playerModule.videoElement.nativeElement;
            console.log("last video ==="+this.selectedVideo.url);
            $("#videoItem").prop("src",this.selectedVideo.url);
          });

    }
  }
  
  ngOnDestroy(){
      console.log("--- close page and save lastPlayVideoId === "+this.selectedVideo.id);
			localStorage.react_lastPlayVideoId = this.selectedVideo.id;
  }

  onSelectedHandler(video:Video){
    this.selectedVideo = video;
    const videoElement = this.playerModule.videoElement.nativeElement;
    console.log("Parent get selected video from list = "+this.selectedVideo.url);
    //videoElement.src = ""; //set src ='' to avoid error message: The fetching process for the media resource was aborted by the user agent at the user's request
    //videoElement.src= video.url;
    $("#videoItem").prop("src","");
    $("#videoItem").prop("src",this.selectedVideo.url);
    videoElement.play(); //get the dom object to play
    
    //also can call methods in child component to play
    // this.playerControlModule.playVideo(); //use this to call methods in playerControlModule

    //disable the play button and enable pause button
    $("#play").prop("disabled","true");
    $("#pause").prop("disabled","");
    //it can also disable or enable the button by using playerControlModule
    //this.playerControlModule.play.nativeElement.setAttribute("disabled","true");
    //this.playerControlModule.pause.nativeElement.removeAttribute("disabled");
  }

}
