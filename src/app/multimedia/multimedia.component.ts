import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../services/multimedia.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {

  constructor( private multiServ:MultimediaService, private authServ:AuthService) { }

  //Listas de datos
  listaIntermedia:any=[];
  videosList:any=[];

  videoNew:boolean = false;
  adding:boolean = false;
  noAdd:boolean= true;


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
      }
    )
  }


  addVideo(){
    this.videoNew=true;
    this.adding= true;
    this.noAdd= false;
  }

  cancelAdd(){
    this.noAdd = true;
    this.adding= false; 
    this.videoNew= false;
  }

  deleteVideo(video){

    Swal({
      title: 'Eliminar Video',
      text: "En serio desea eliminar este video del sistema? No será posible recuperarlo en caso de eliminarlo!!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        Swal(
          'Elimiando!',
          'El video ha sido eliminado correctamnete',
          'success'
        )
        this.multiServ.deleteVideo(video.key);
      }
    })

  }


  addUrl(){
    let urlV = new String((<HTMLInputElement>document.getElementById("url")).value);
    let VideoID = urlV.substring( urlV.indexOf("?v=")+3 );
    //console.log("new video ", VideoID);
    let json ={
      url:VideoID
    }
    this.multiServ.addVideo(json);
    this.videoNew=false;
    Swal("Bien!", "Video agregado Correctamente", "success");

  }

}
