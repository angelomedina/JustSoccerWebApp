import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayersService } from '../services/players.service';
import { PositionTableService } from '../services/position-table.service';
import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  constructor(private authServ:AuthService, private playerServ:PlayersService, private tableServ:PositionTableService,private storage:AngularFireStorage) { }

  //Listas de datos
  listaIntermedia:any=[];
  listaIntermediaDos:any=[];
  playerList:any=[];
  tablesList:any=[];
  playerNoInscritas:any =[];

  //Variables NgIf
  ver:boolean=false;
  inscribe:boolean=false;
  add:boolean= false;

  //Variables NGModel
  name="";
  apellido1="";
  apellido2="";
  nac="";
  nacionalidad="";
  posicion=""; peso=""; tama="";

  // Observables
  uploadPercent:Observable<number>;
  urlImg:Observable<String>;
  urlImagen:any;

  tablaUsar:any={};
  teams:any;
  equiposTable:any =[];


  ngOnInit() {
    this.playerServ.getPlayers().snapshotChanges()  // Obtiene todas la info de Players de DB
    .subscribe(
      Player =>{
        this.playerList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Player);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }

          this.playerList.push(noteI);
        }
        this.verJugadoras();
        this.obtieneNoInscritas();
      }
    )
    this.tableServ.getPositionTable().snapshotChanges()  // Obtiene todas la info de Tablas Posiciones de DB
    .subscribe(
      Tables =>{
        this.tablesList=[]; // Resetea arreglo
        this.listaIntermediaDos=[];
        this.listaIntermediaDos.push(Tables);
        for(var i=0; i<this.listaIntermediaDos[0].length;i++){
          let noteI={
             key: this.listaIntermediaDos[0][i].key,
             data:this.listaIntermediaDos[0][i].payload.toJSON()
          }
          this.tablesList.push(noteI);
        }
       this.tablaUsar = this.tablesList.pop();
       this.obtieneEquiposTabla();
      }
    )
  }

  verJugadoras(){
    this.ver=true;
    this.inscribe=false;
    this.add=false;
  }
  addPlayer(){
    this.ver=false;
    this.inscribe=false;
    this.add=true;
  }

  inscribirPlayer(){
    this.ver=false;
    this.inscribe=true;
    this.add=false;
    this.teams = this.tablaUsar.data.teams;
  }


  addPlayerNew(){
    this.urlImg.subscribe(val =>{
      this.urlImagen= val;
    let json={
      name:this.name,
      surnameI:this.apellido1,
      surnameII:this.apellido2,
      birth:this.nac,
      position:this.posicion,
      country:this.nacionalidad,
      weigh:this.peso,
      heigh:this.tama,
      estado:"No Inscrita",
      idTeam:"NULL",
      url:this.urlImagen
    }

    console.log("", json);
    this.playerServ.addPlayer(json);
    Swal("Bien!", "Jugadora agregada Correctamente", "success");
    this.inscribirPlayer();
    this.resetForm();
  })}

  resetForm(){
    this.name="";
    this.apellido1="";
    this.apellido2="";
    this.nac="";
    this.posicion="";
    this.nacionalidad="";
    this.peso="";
    this.tama="";
  }

  upload(e){  // Metodo para realiozar la subida de la imagen a FireStore
    let file = e.target.files[0];
    let path="/profiles/"+file.name;
    let ref = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>{
      this.urlImg= ref.getDownloadURL()
    } ) ).subscribe();
  }

  obtieneEquiposTabla(){
    for(var i=0; i< 8;i++){   /// .length = undefiend ... en este caso, solo usar si son 8 equipos
      this.equiposTable.push(this.tablaUsar.data.teams[i]);
    }

  }

  obtieneNoInscritas(){
    this.playerNoInscritas=[];
    for(var i=0; i<this.playerList.length;i++){   /// .length = undefiend ... en este caso, solo usar si son 8 equipos
      if(this.playerList[i].data.estado =="No Inscrita"){
        this.playerNoInscritas.push(this.playerList[i]);
      }
    }
  }

  inscribirPlayerNew(){
    let idT= (<HTMLInputElement>document.getElementById("team")).value;
    let idPlayer =  (<HTMLInputElement>document.getElementById("player")).value;
    for(var i=0; i< this.playerNoInscritas.length;i++){
      if(this.playerNoInscritas[i].key == idPlayer){
        let json={
          name:this.playerNoInscritas[i].data.name,
          surnameI:this.playerNoInscritas[i].data.surnameI,
          surnameII:this.playerNoInscritas[i].data.surnameII,
          birth:this.playerNoInscritas[i].data.birth,
          position:this.playerNoInscritas[i].data.position,
          country:this.playerNoInscritas[i].data.country,
          weigh:this.playerNoInscritas[i].data.weigh,
          heigh:this.playerNoInscritas[i].data.heigh,
          estado:"Inscrita",
          idTeam:idT,
          url:this.playerNoInscritas[i].data.url,
        }
        this.playerServ.updatePlayer(json,idPlayer);
        this.obtieneNoInscritas();
        return;
      }

    }

  }


}
