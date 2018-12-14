import { Component, OnInit } from '@angular/core';
import {NotasService} from '../services/notas.service';
import Swal from 'sweetalert2';

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
  modalVisible=false;

  //Listas de datos

  listaIntermedia:any=[];
  notesList:any=[];

  notatemp:any={};

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
        //console.log("",this.notesList);
      }
    )

  }

  creaNota(){
    this.createNote= true;
    this.deleteNote=false;
    this.readNote=false;
    this.updateNote=false;

  }

  creaNotaDB(){
    console.log("crea");
    let notaNew={
      title: this.titleNote,
      body:this.dataModel,
      date:"13/03/2019",
      author:"User Logueado",
      url:""
    }
    //console.log("NOTA NEW: ", notaNew);

    this.notaServ.addNote(notaNew);
    Swal("Bien!", "Nota agregada Correctamente", "success");
    this.dataModel="";
    this.titleNote="";

  }

  veNotas(){
    this.createNote= false;
    this.deleteNote=false;
    this.readNote=true;
    this.updateNote=false;

    setTimeout(() => {
      for(var i=0;i<=this.notesList.length;i++){
        document.getElementById("p_"+i).innerHTML= this.notesList[i].data.body;
      }

    }, 600);


  }

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

  editaNota(nota){
    this.modalVisible=true;
    this.notatemp= nota;
    this.dataModel= nota.data.body;

  }

  editaNotaDefinitiva(){
    Swal({
      title: 'Modificar Nota?',
      //text: "Una vez modificada, la nota no podrá ser recuperada!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarla!'
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
        this.notaServ.updateNote(newNota);
        Swal(
          'Modificada!',
          'La nota ha sido modificada Correctamente',
          'success'
        )
      }
    })
  }


}
