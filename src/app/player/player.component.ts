import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() video:Video;
  @ViewChild('videoElement',{static:true}) videoElement:any
  constructor() {}

  ngOnInit() {
    this.video = new Video();
    //this.videoElement.nativeElement.src = "assets/video/test1.mp4"; //just for test
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.video) console.log("--- Child player get from parent = "+this.video.url);
  }

}
