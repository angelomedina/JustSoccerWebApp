import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor(private firebase:AngularFireDatabase) { }

  videosList:AngularFireList<any>;

  public getVideos(){ // Obtiene todods las tablas de la DB
    return this.videosList= this.firebase.list('videos');
  }

  addVideo(video){  // Realiza la inserción de una tabla en la DB
    this.videosList.push(video);
  }

  deleteVideo(idVideo){
    this.videosList.remove(idVideo);
  }

  updateVideo(video,key){
    this.firebase.database.ref('videos/'+key).set(video);
  }
}
