import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TournamentService} from '../services/tournament.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {

  constructor(private authServ:AuthService, private tournServ: TournamentService) { }

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


  ngOnInit() {
    this.read=true;

    this.tournServ.getTournament().snapshotChanges()
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
      category:this.category
    }

    this.tournServ.addTournament(json); // Agrega el nuevo Torneo creado....
    Swal("Bien!", "Torneo Creado Correctamente!", "success");


  }

  resetForm(){
    this.name=""; this.category=""; this.fecha="";
  }

}
