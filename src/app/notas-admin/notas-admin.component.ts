import { Component, OnInit } from '@angular/core';
import {NotasService} from '../services/notas.service';
import { BloggerService } from '../services/blogger.service';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { HttpClient } from '@angular/common/http';

import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent implements OnInit {

  constructor(private notaServ:NotasService, private authServ:AuthService,private storage:AngularFireStorage,
    private http: HttpClient) {
  }

  // Variables bandera para CRUD de notas
  createNote:boolean= false;
  deleteNote:boolean= false;
  updateNote:boolean= false;
  readNote:boolean= true;
  modalVisible=false;

  //Listas de datos

  listaIntermedia:any=[];
  notesList:any=[];
  notatemp:any={};

  jsonNotas={
    items:"",
    nextPageToken:""
  }

  dataModel="";
  titleNote="";

    // Observables
    uploadPercent:Observable<number>;
    urlImg:Observable<String>;
    urlImagen:any;


  ngOnInit() {

    this.notesList=[]; // Resetea arreglo
    this.jsonNotas={
      items:"",
      nextPageToken:""
    };

    return this.http.get("https://www.googleapis.com/blogger/v3/blogs/2811544302412945813/posts?fetchBodies=true&fetchImages=true&maxResults=100&key=AIzaSyDC9bpgeN4HCnUwffRJombvFBq5wRb7Eyg")
    .subscribe(
      success => {
        let posts:any = success;//agregar la variable para extraer los datos

        for(let i =0; i< posts.items.length;i++){
         this.notesList.push(posts.items[i]);
        }
        this.jsonNotas.items= this.notesList;
        this.jsonNotas.nextPageToken= posts.nextPageToken;

      },
      err => {
        console.log("Error ",err);
      }
    )


    /*  Obtiene notas desde FireBase
    this.notaServ.getNotes().snapshotChanges()
    .subscribe(
      note =>{
        this.notesList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(note);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }

          this.notesList.push(noteI);
        }
        this.veNotas();
      }
    )*/

  }

  creaNota(){
    this.createNote= true;
    this.deleteNote=false;
    this.readNote=false;
    this.updateNote=false;

  }


  upload(e){  // Metodo para realiozar la subida de la imagen a FireStore
    let file = e.target.files[0];
    let path="notes/"+file.name;
    let ref = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>{
      this.urlImg= ref.getDownloadURL()
    }) ).subscribe();
  }

/*
  creaNotaDB(){
    let nombreUser = this.returnFullname();

    this.urlImg.subscribe(val =>{
      this.urlImagen= val;

    let notaNew={
      title: this.titleNote,
      body:this.dataModel,
      date:"13/03/2019",
      author:nombreUser,
      url:this.urlImagen
    }

    this.notaServ.addNote(notaNew);
    Swal("Bien!", "Nota agregada Correctamente", "success");
    this.dataModel="";
    this.titleNote="";
  })}
  */

  veNotas(){
    this.createNote= false;
    this.deleteNote=false;
    this.readNote=true;
    this.updateNote=false;

    // setTimeout(() => {
    //   for(var i=0;i<=this.notesList.length;i++){
    //     document.getElementById("p_"+i).innerHTML= this.notesList[i].data.body;
    //   }

    // }, 600);

  }

 /*
  borraNota(idNota){
    Swal({
      title: 'Borrar Nota?',
      text: "Una vez eliminada, la nota no podrá ser recuperada!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarla!'
    }).then((result) => {
      if (result.value) {
        this.notaServ.deleteNote(idNota);
        Swal(
          'Eliminado!',
          'La nota ha sido eliminada Correctamente',
          'success'
        )
      }
    })

  }
*/

/*
  editaNota(nota){
    this.modalVisible=true;
    this.notatemp= nota;
    this.dataModel= nota.data.body
  }
*/

  /*
  editaNotaDefinitiva(){
    Swal({
      title: 'Modificar Nota?',
      //text: "Una vez modificada, la nota no podrá ser recuperada!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo Modificarla!'
    }).then((result) => {
      if (result.value) {
        let newNota={
          key: this.notatemp.key,
          data:{
            title: this.notatemp.data.title,
            body:this.dataModel,
            date:"13/03/2019",
            author:"User Logueado",
            url:""
          }
        }
        console.log("Nueva nota a modificar ", newNota);
        this.notaServ.updateNote(newNota);
        Swal(
          'Modificada!',
          'La nota ha sido modificada Correctamente',
          'success'
        )
      }
    })
  }*/


  returnFullname(){
    let nombreCompleto = this.authServ.usserLogged.data.name+" "+ this.authServ.usserLogged.data.surnameI+" "+ this.authServ.usserLogged.data.surnameII;
    console.log(nombreCompleto);
    return nombreCompleto;
  }


}
