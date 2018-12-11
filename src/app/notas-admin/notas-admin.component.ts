import { Component, OnInit } from '@angular/core';
import {NotasService} from '../services/notas.service';


@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent implements OnInit {

  constructor(private notaServ:NotasService) {

  }

  // Variables bandera para CRUD de notas
  createNote:boolean= true;
  deleteNote:boolean= false;
  updateNote:boolean= false;
  readNote:boolean= false;

  //Listas de datos

  listaIntermedia:any=[];
  notesList:any=[];

  dataModel="";
  titleNote="";


  ngOnInit() {
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
      }
    )
  }

  creaNota(){
    this.createNote= true;
    this.deleteNote=false;
    this.readNote=false;
    this.updateNote=false;

    let notaNew={
      title: this.titleNote,
      body:this.dataModel,
      date:"13/03/2019",
      author:"User Logueado",
      url:""
    }

    this.notaServ.addNote(notaNew);

  }

  veNotas(){
    this.createNote= false;
    this.deleteNote=false;
    this.readNote=true;
    this.updateNote=false;
  }

}
