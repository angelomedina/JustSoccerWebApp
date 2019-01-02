import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayersService } from '../services/players.service';
import { PositionTableService } from '../services/position-table.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  constructor(private authServ:AuthService, private playerServ:PlayersService, private tableServ:PositionTableService) { }

  //Listas de datos
  listaIntermedia:any=[];
  playerList:any=[];

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
  }


  addPlayerNew(){
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
      idTeam:"NULL"
    }

    console.log("", json);
    this.playerServ.addPlayer(json);
    this.resetForm();
  }

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

}
