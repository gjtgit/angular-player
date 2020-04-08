import { Component, OnInit, ViewChild, Input, ElementRef, SimpleChanges } from '@angular/core';
import { Video } from '../video';
import $ from 'jquery';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.css']
})
export class PlayerControlComponent implements OnInit {
  @Input() video:Video;
  @Input() playerModule:any;
  videoElement:any; 
  
  curV = 0.3;
  isMuted = false;

  constructor() { }

  ngOnInit() {
    this.videoElement = this.playerModule.videoElement.nativeElement;
    console.log("--- Child PlayerControl get videoElement=="+this.videoElement.src);
    if(!localStorage.likecount){
      localStorage.likecount = 0;
    }
    if(!localStorage.unlikecount){
      localStorage.unlikecount = 0;
    }
    $("#play").prop("disabled","");
    $("#pause").prop("disabled","true");
    
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.video){
      $("#num_like").text(this.video.likes);
      $("#num_dislike").text(this.video.unlike);
      if(!localStorage.likecount){
        localStorage.likecount = 0;
      }
      if(!localStorage.unlikecount){
        localStorage.unlikecount = 0;
      }
      console.log("Child playerControl get from parent = "+this.video.url);
    }
  }
  
  playVideo(){
    this.videoElement.play();
    $("#play").prop("disabled","true");
    $("#pause").prop("disabled","");
	}

	pauseVideo(){
		this.videoElement.pause();
    $("#play").prop("disabled","");
    $("#pause").prop("disabled","true");
	}

	volumeUp(){
		if(!this.isMuted){
			this.videoElement.volume = this.curV;
			if(this.videoElement.volume+0.1 > 1 ) this.videoElement.volume = 1;
			else this.videoElement.volume = (this.videoElement.volume + 0.1).toFixed(1);
			this.curV = this.videoElement.volume;
		}
	}
	
	volumeDown(){
		if(!this.isMuted){
			this.videoElement.volume = this.curV;
			if(this.videoElement.volume-0.1 < 0 ) this.videoElement.volume = 0;
			else this.videoElement.volume = (this.videoElement.volume - 0.1).toFixed(1);
			this.curV = this.videoElement.volume;
		}    
	}
	
	reload(){
		this.videoElement.currentTime = 0;
		this.videoElement.play();
    $("#play").prop("disabled","true");
    $("#pause").prop("disabled","");
	}

	muteVolume(){
		if(this.isMuted){
			this.isMuted = false;
      this.videoElement.volume = this.curV;
      $("#mute img").prop("src", "assets/images/unmute.png");
		}else{
			this.isMuted = true;
      this.videoElement.volume = 0;
      $("#mute img").prop("src", "assets/images/mute.png");
		}
	}

	like(){
		if(localStorage.likecount){
			localStorage.likecount = Number(localStorage.likecount)+1;
		}
    $("#num_like").text(localStorage.likecount);
	}
	
	dislike(){
		if(localStorage.unlikecount){
			localStorage.unlikecount = Number(localStorage.unlikecount)+1;
		}
    $("#num_dislike").text(localStorage.unlikecount);
  }

  updateProgress() {
		if(this.videoElement){
			this.videoElement.ontimeupdate=function(){
        // if(this.progressbar){
          if(this.duration){
            var per = ((this.currentTime / this.duration)*100).toFixed(0);
            if(per && typeof(per)!="undefined"){
              if($("#videoProgress")){
                $("#videoProgress").prop("style","width:"+per+"%");
              }
            }

            if(this.currentTime === this.duration){
							this.currentTime = 0;
              this.pause();
              $("#play").prop("disabled","");
              $("#pause").prop("disabled",'true');
						} 
					}else{
						this.currentTime = 0;
						this.pause();
            $("#play").prop("disabled","");
            $("#pause").prop("disabled",'true');
					}
				// }
			 }
		}
  }
  
}
