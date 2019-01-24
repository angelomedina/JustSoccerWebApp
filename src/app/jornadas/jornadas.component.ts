import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import {DaytripsService} from '../services/daytrips.service';
import { TournamentService } from '../services/tournament.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {

  constructor( private dayServ:DaytripsService, private tournServ:TournamentService, private authServ:AuthService,private teamsServ:TeamService) { }

  loading:boolean=true; //Spinner
  create:boolean = true;
  newMatch:boolean=false;
  matchReady:boolean= false;
  formActivate:boolean=true;
  ver:boolean= false;

  //Listas de datos
  listaIntermedia:any=[];
  jornadaList:any=[];

  listaIntermediaDos:any=[];
  torneoList:any=[];

  listaIntermediaTres:any=[];
  equiposList:any=[];
  matchsJornada:any=[];

  //Ngmodel
  torneo="";
  name="";
  fechaInicio="";
  fechaFin="";
  teamVisita="";
  teamLocal="";
  fechaMatch="";
  sedeMatch="";
  typeJornada="";

  ngOnInit() {
    this.create= true;
    this.loading= true;

    this.tournServ.getTournament().snapshotChanges()
    .subscribe(
      Torneo =>{
        this.torneoList=[]; // Resetea arreglo
        this.listaIntermediaDos=[];
        this.listaIntermediaDos.push(Torneo);
        for(var i=0; i<this.listaIntermediaDos[0].length;i++){
          let noteI={
             key: this.listaIntermediaDos[0][i].key,
             data:this.listaIntermediaDos[0][i].payload.toJSON()
          }
          this.torneoList.push(noteI);
        }
        //console.log("",this.torneoList)
        //this.obtenerTorneoActual();
      }
    )

    this.teamsServ.getTeam().snapshotChanges()
    .subscribe(
      Team =>{
        this.equiposList=[]; // Resetea arreglo
        this.listaIntermediaTres=[];
        this.listaIntermediaTres.push(Team);
        for(var i=0; i<this.listaIntermediaTres[0].length;i++){
          let noteI={
             key: this.listaIntermediaTres[0][i].key,
             data:this.listaIntermediaTres[0][i].payload.toJSON()
          }
          this.equiposList.push(noteI);
        }
        //this.obtenerTorneoActual();
      }
    )

    this.dayServ.getDayTrips().snapshotChanges()
    .subscribe(
      Day =>{
        this.jornadaList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Day);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.jornadaList.push(noteI);
        }
        //this.obtenerTorneoActual();
      }
    )


  }

  nuevoPartido(){
    this.newMatch= true;
  }

  addJornada(){
    this.create=true;
    this.ver=false;
  }

  verJornada(){
    this.create=false;
    this.ver=true;
  }

  addMatch(){
    if(this.teamLocal == this.teamVisita  || this.teamLocal==""  || this.teamVisita== ""){
      Swal('Oops...', 'Debe de seleccioanr equipos diferentes', 'error');
    }else{

      let idVisita = (<HTMLInputElement>document.getElementById("visit")).value;  // Se obtienen los ids
      let idLocal = (<HTMLInputElement>document.getElementById("local")).value;   // de los equipos del partido
      let nombreLocal= this.obtieneNombreEquipo(idVisita);
      let nombreVisita= this.obtieneNombreEquipo(idLocal);


      let json ={
        estatus:"En espera",
        date:this.fechaMatch,
        sede:this.sedeMatch,
        idTeamVisita:idVisita,
        idTeamLocal:idLocal,
        nameLocalTeam:nombreLocal,
        nameVisitTeam: nombreVisita,
        resultVisit:"No disponible",
        resultLocal:"No disponible"
      }
      console.log("Partido ", json)
      this.matchsJornada.push(json);
      this.matchReady= true;
      Swal('Bien!', 'Partido agregado a la jornada Correctamente', 'success');
      this.newMatch=false;
    }

  }

  obtieneNombreEquipo(key){
    for(var i=0; i<this.equiposList.length;i++){
      if(this.equiposList[i].key == key ){
          return this.equiposList[i].data.name;
      }
    }
  }


  createjournal(){

    let idTorneo = (<HTMLInputElement>document.getElementById("torneo")).value;
    let tipo =  (<HTMLInputElement>document.getElementById("typeJornada")).value;

    let json={
      idTournament:idTorneo,
      matchs:this.matchsJornada,
      cantidad: this.matchsJornada.length,
      name:this.name,
      dateBegin: this.fechaInicio,
      dateEnd: this.fechaFin,
      typeJornada:tipo
    }

    //console.log("Jornada: ", json)
    this.dayServ.addDayTrip(json);

  }


  ocultaForm1(){
    this.formActivate= false;
  }

  muestraForm1(){
    this.formActivate= true;
  }

  mostrarPartidosJornada(idJornada){
  console.log(" ", idJornada);

  // Se crea el html
  let html="<div style='margin-left:2%;margin-right:2%'> </br> ";
  console.log("",idJornada.data.matchs)
  console.log("",idJornada.data.cantidad)

  for (let i = 0; i < idJornada.data.cantidad; i++) {
    html = html+ "<p style ='color:blue;'> "+ idJornada.data.matchs[i].nameLocalTeam+ " VS "+ idJornada.data.matchs[i].nameVisitTeam+"</p>"
  }
   html= html +"</div>";
   console.log(" ", html);
  (<HTMLInputElement>document.getElementById(idJornada.key)).innerHTML = html;  //Obtiene el id de la jornada
  }

}
