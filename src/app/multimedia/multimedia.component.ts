import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../services/multimedia.service';



@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {

  constructor( private multiServ:MultimediaService) { }

  //Listas de datos
  listaIntermedia:any=[];
  videosList:any=[];


  ngOnInit() {
    this.multiServ.getVideos().snapshotChanges()  // Al inicair View obtiene todos los videos de DB
    .subscribe(
      Video =>{
        this.videosList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Video);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.videosList.push(noteI);
        }
        console.log("videos", this.videosList)
      }
    )
  }

}
