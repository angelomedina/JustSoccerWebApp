import { Component, OnInit } from '@angular/core';
import {TeamService} from '../services/team.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from "@angular/router";


@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  constructor(private teamServ:TeamService,private _activatedRouter:ActivatedRoute,private router: Router) {
    this._activatedRouter.params.subscribe(params =>{
      console.log(params['id']);  // retorna objeto con parametro de url
      this.IDteam= params['id'];
    });
   }

   loading:boolean=true; //Spinner

   IDteam:any;  // Id del Equipo por URL
   equipoActual:any={};

  //Listas de datos
  listaIntermedia:any=[];
  teamList:any=[];

  ngOnInit() {// CONSIGUE TODOS LOS EQUIPOS AL INICIALIZAR
    this.loading= true;
    this.teamServ.getTeam().snapshotChanges()
    .subscribe(
      note =>{
        this.teamList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(note);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.teamList.push(noteI);
        }
        this.obtenerEquipoActual();

      }

    )

  }


  obtenerEquipoActual(){
    for(var i=0; i< this.teamList.length; i++){
      if(this.teamList[i].key == this.IDteam){
        this.equipoActual= this.teamList[i];
        this.loading= false;
        return;
      }
    } // Si no hata el equipo con ID  // Page NOt Found
    this.router.navigate(['/GG']);

  }

}
