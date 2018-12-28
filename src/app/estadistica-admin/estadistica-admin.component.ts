import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { TournamentService } from '../services/tournament.service';
import { PositionTableService } from '../services/position-table.service';

@Component({
  selector: 'app-estadistica-admin',
  templateUrl: './estadistica-admin.component.html',
  styleUrls: ['./estadistica-admin.component.css']
})
export class EstadisticaAdminComponent implements OnInit {

  constructor(private _activatedRouter:ActivatedRoute,private router: Router,private authServ:AuthService,
    private tournServ:TournamentService,private positionServ:PositionTableService) {
    this._activatedRouter.params.subscribe(params =>{
      console.log(params['id']);  // retorna objeto con parametro de url
      this.IDToneo= params['id'];
    });
   }

   loading:boolean=true; //Spinner

   IDToneo:any;  // Id de la nota por URL
   torneoActual:any={};
   tablaActual:any={};
  equiposTable:any =[];



   //Listas de datos
  listaIntermedia:any=[];
  torneoList:any=[];

  listaIntermediaDos:any=[];
  tableList:any=[];



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
        this.obtenerTorneoActual();
      }
    )

    this.positionServ.getPositionTable().snapshotChanges()
    .subscribe(
      Torneo =>{
        this.tableList=[]; // Resetea arreglo
        this.listaIntermediaDos=[];
        this.listaIntermediaDos.push(Torneo);
        for(var i=0; i<this.listaIntermediaDos[0].length;i++){
          let noteI={
             key: this.listaIntermediaDos[0][i].key,
             data:this.listaIntermediaDos[0][i].payload.toJSON()
          }
          this.tableList.push(noteI);
        }
        this.obtenerPosicionTablaActual();
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

  obtenerPosicionTablaActual(){
      for (let index = 0; index < this.tableList.length; index++) {
        if(this.tableList[index].data.idTournamnet == this.torneoActual.key){
          this.tablaActual= this.tableList[index];
          this.obtieneEquiposTabla();
          return;
        }
      }

  }

  obtieneEquiposTabla(){
    for(var i=0; i< 8;i++){   /// .length = undefiend ... en este caso, solo usar si son 8 equipos
      this.equiposTable.push(this.tablaActual.data.teams[i]);
    }
  }

}
