import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-estadistica-admin',
  templateUrl: './estadistica-admin.component.html',
  styleUrls: ['./estadistica-admin.component.css']
})
export class EstadisticaAdminComponent implements OnInit {

  constructor(private _activatedRouter:ActivatedRoute,private router: Router,private authServ:AuthService, private tournServ:TournamentService) {
    this._activatedRouter.params.subscribe(params =>{
      console.log(params['id']);  // retorna objeto con parametro de url
      this.IDToneo= params['id'];
    });
   }

   loading:boolean=true; //Spinner

   IDToneo:any;  // Id de la nota por URL
   torneoActual:any={};

   //Listas de datos
  listaIntermedia:any=[];
  torneoList:any=[];

  ngOnInit() {  // Obtiene todos los torneos al iniciar
    this.loading= true;
    this.tournServ.getTournament().snapshotChanges()
    .subscribe(
      Torneo =>{
        this.torneoList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Torneo);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.torneoList.push(noteI);

        }
        console.log(" ", this.torneoList)
        this.obtenerTorneoActual();

      }

    )
  }

  obtenerTorneoActual(){
    for(var i=0; i< this.torneoList.length; i++){
      if(this.torneoList[i].key == this.IDToneo){
        this.torneoActual= this.torneoList[i];
        this.loading= false;
        return;
      }
    } // Si no haya la Nota con ID  // Page NOt Found
    this.router.navigate(['/GG']);

  }

}
