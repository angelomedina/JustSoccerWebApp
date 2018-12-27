import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from "@angular/router";
import { NotasService } from '../services/notas.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nota-info',
  templateUrl: './nota-info.component.html'
})
export class NotaInfoComponent implements OnInit {

  constructor(private _activatedRouter:ActivatedRoute,private router: Router, private noteServ:NotasService,private authServ:AuthService) {
    this._activatedRouter.params.subscribe(params =>{
      console.log(params['id']);  // retorna objeto con parametro de url
      this.IDNote= params['id'];
    });
  }

  loading:boolean=true; //Spinner

   IDNote:any;  // Id de la nota por URL
   notaActual:any={};

  //Listas de datos
  listaIntermedia:any=[];
  noteList:any=[];

  notatemp:any={};

  dataModel="";
  titleNote="";



  ngOnInit() {  // OBTIENE TODAS LAS NOTAS AL INICIAR VIEW
    this.loading= true;
    this.noteServ.getNotes().snapshotChanges()
    .subscribe(
      note =>{
        this.noteList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(note);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.noteList.push(noteI);
        }
        this.obtenerNotaActual();

      }

    )
  }

  obtenerNotaActual(){
    for(var i=0; i< this.noteList.length; i++){
      if(this.noteList[i].key == this.IDNote){
        this.notaActual= this.noteList[i];
        this.obtenerInfoNota();
        return;
      }
    } // Si no haya la Nota con ID  // Page NOt Found
    this.router.navigate(['/GG']);

  }

  obtenerInfoNota(){
    //console.log("", this.notaActual)
    this.loading= false;
     setTimeout(() => {
         document.getElementById("dinamic").innerHTML= this.notaActual.data.body;
     }, 400);

  }

  editaNota(nota){
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
        this.noteServ.updateNote(newNota);
        Swal(
          'Modificada!',
          'La nota ha sido modificada Correctamente',
          'success'
        )
      }
    })
  }








}
