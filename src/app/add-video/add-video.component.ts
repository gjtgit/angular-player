import { Component, OnInit } from '@angular/core';
import { VideoSrvService } from '../video-srv.service';
import { Video } from '../video';
import $ from 'jquery';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  videoes: Video[];
  
  constructor(private videoSrv:VideoSrvService) { }

  ngOnInit() {
    this.getVideoes();
  }

  getVideoes(){
    this.videoSrv.getData(null)
      .subscribe(videoes => this.videoes = videoes);
  }

  add(title: string, url: string): void {
    title = title.trim();
    url = url.trim();
    if (!title || !url) { alert("Title or Url can't be blank");return; }
    const newVideo = {'title': title, 'url': url, 'approved':0, 'likes':0,'unlike':0};
    this.videoSrv.addVideo(newVideo as Video)
      .subscribe(v => {
        this.videoes.push(v);
      });
  }

  delete(video: Video): void {
    this.videoes = this.videoes.filter(v => v !== video);
    this.videoSrv.deleteVideo(video).subscribe();
  }

  approve(video:Video): void {
    video.approved = 1;
    const findV = this.videoes.find(v=> v.id == video.id);
    this.videoSrv.updateVideo(video)
      .subscribe(()=>console.log(findV));	
  }

  update(video:Video, url:string): void {
    const findV = this.videoes.find(v=> v.id == video.id);
    if(video.url!= url){
      video.url = url;
      video.approved = 0;
      this.videoSrv.updateVideo(video)
        .subscribe(()=>{
          console.log(findV);
          alert("Update succesully");
        });	
    }
  }
 
  changeBg(seqId:number){
    var vList = $("tbody").find("tr");
    for(var i=0;i<vList.length;i++){
      if(i == seqId){
        vList[i].className = "bg-info";
      }else{
        vList[i].className = "";
      }
    }

  }
}
