import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TournamentService} from '../services/tournament.service';
import Swal from 'sweetalert2';
import { TeamService } from '../services/team.service';
import { PositionTableService } from '../services/position-table.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {

  constructor(private authServ:AuthService, private tournServ: TournamentService, private teamServ:TeamService, private positionServ:PositionTableService) { }

  // Bandeeras NgIf
  create:boolean= false;
  read:boolean= true;

  //Variables NGModel
  name:String="";
  fecha="";
  category="";

  //Lista de Datos
  listaIntermedia:any=[];
  TournamnetList:any=[];

  listaIntermediaDos:any=[];
  TeamList:any=[];

  listaIntermediaTres:any=[];
  tableList:any=[];

  keyTorneoCreado:any;


  ngOnInit() {
    this.read=true;

    this.tournServ.getTournament().snapshotChanges()  // Obtiene torneos de DB
    .subscribe(
      Tournamnet =>{
        this.TournamnetList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Tournamnet);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let userI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }

          this.TournamnetList.push(userI);
        }
      }
    )

    this.teamServ.getTeam().snapshotChanges()  // Obtiene equipos de DB
    .subscribe(
      Team =>{
        this.TeamList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermediaDos.push(Team);
        for(var i=0; i<this.listaIntermediaDos[0].length;i++){
          let userI={
             key: this.listaIntermediaDos[0][i].key,
             data:this.listaIntermediaDos[0][i].payload.toJSON()
          }

          this.TeamList.push(userI);
        }
      }
    )

    this.positionServ.getPositionTable().snapshotChanges()  // Obtiene tablas de posiciones de DB
    .subscribe(
      Tabla =>{
        this.tableList=[]; // Resetea arreglo
        this.listaIntermediaTres=[];
        this.listaIntermediaTres.push(Tabla);
      }
    )


  }

  creaTorneo(){
    this.create= true;
    this.read=false;
  }
  verTorneos(){
    this.create= false;
    this.read=true;
  }

  createTournamet(){


    let json ={
      name:this.name,
      date: this.fecha,
      category:this.category,
      dayTrips:[]
    }

    let a= this.tournServ.addTournament(json); // Agrega el nuevo Torneo creado....
    this.keyTorneoCreado= a.key;   // Obtiene el key del torneo creado , el cual sera utilizado para crear la tabla de posiciones

    this.createPositioTable();


  }

  createPositioTable(){
    // Metodo utilizado despues de crear el torneo, generando asi su tabal de posiciones respectiva

    let positions:any=[];
    let cant=0;

    for (var i = 0; i < this.TeamList.length; i++) {
      let teamPos= {  // Genera un json predeterminado por cada equipo de Primera Division
        name:this.TeamList[i].data.name,
        idTeam:this.TeamList[i].key,
        position: i+1,
        pj:0,
        pg:0,
        pe:0,
        pp:0,
        avg:0,
        pts:0,
        gf:0,
        gc:0
      }

      positions.push(teamPos); // agrega a lista el json generado
      cant++;
    }

    let json={
      idTournamnet: this.keyTorneoCreado,
      teams: positions,
      cantidad: cant
    }

    this.positionServ.addPositionTable(json);
    Swal("Bien!", "Torneo Creado Correctamente!", "success");

  }



  resetForm(){
    this.name=""; this.category=""; this.fecha="";
  }

}
