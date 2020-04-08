import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoSrvService} from '../video-srv.service';
import { Video } from '../video';
import $ from 'jquery';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  videoes: Video[];
  
  //use @ouput and EventEmitter to emit the selected video so parent component can handle it
  //default the event name is the @output property, can use @Output("xxxx") to change it
  //in parent component use (onSelectedVideo)="onSelectedHandler($event)" to bind the event and handler method
  @Output() onSelectedVideo: EventEmitter<any> = new EventEmitter();

  constructor(private videoSrv:VideoSrvService) { }

  ngOnInit() {
    this.getVideoes();
  }

  getVideoes(){
    this.videoSrv.getData(1)
      .subscribe(videoes => this.videoes = videoes);
  }

  onSelectedItem(video:Video, seqId:number){
    this.onSelectedVideo.emit(video);
    var vList = $("#videoList").find("li");
    for(var i=0;i<vList.length;i++){
      if(i == seqId){
        vList[i].className = "list-item bg-info";
      }else{
        vList[i].className = "list-item";
      }
    }

  }
}
