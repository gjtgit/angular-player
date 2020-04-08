import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Video } from './video';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoSrvService {
  private reqUrl = 'http://localhost:3000/youtube';	
  constructor(private http:HttpClient) { }

  getData(approved:number):Observable<Video[]>{
    const url = this.reqUrl + (approved == null ? '' : `?approved=${approved}`);
    return this.http.get<Video[]>(url)
	  .pipe(
      tap(value=>{
        console.log(value);
      })
      ,catchError(this.handleError<Video[]>('getVideoes',[]))
    ); 
  }
  
  getVideo(id:number){
    const url = this.reqUrl + `/${id}`;
    return this.http.get<Video>(url)
	  .pipe(
      tap(value=>{
        console.log(value);
      })
      ,catchError(this.handleError<Video>('getVideo',null))
    ); 
  }

  updateVideo (video: Video): Observable<any>{
    const url = `${this.reqUrl}/${video.id}`;
	  return this.http.put(url, video, httpOptions).pipe(
	    tap(_=> console.log(`videoSrvService: update video id=${video.id}`)),
		  catchError(this.handleError<any>(`update video id=${video.id}`))
	  );	
  }
  
  addVideo (video: Video): Observable<Video> {
    return this.http.post<Video>(this.reqUrl, video, httpOptions).pipe(
      tap((newVideo: Video) => console.log(`added video id=${newVideo.id}`)),
      catchError(this.handleError<Video>('addVideo'))
    );
  }

  deleteVideo (video: Video | number): Observable<Video> {
    const id = typeof video === 'number' ? video : video.id;
    const url = this.reqUrl+'/'+id;
  
    return this.http.delete<Video>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted video id==${id}`)),
      catchError(this.handleError<Video>('deleteVideo'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
	  };
  }

}
