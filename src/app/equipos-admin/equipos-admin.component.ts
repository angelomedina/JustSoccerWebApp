import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TeamService} from '../services/team.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.css']
})
export class EquiposAdminComponent implements OnInit {

  constructor(private authServ:AuthService, private teamServ:TeamService) { }

  //Datos ngModel
  nombre="";
  logoImg="";
  estadioImg="";
  fechaFundac="";
  localization="";
  copas=0;
  descrip="";

  add= false;
  view=true;

  //Listas de datos
  listaIntermedia:any=[];
  teamList:any=[];

  ngOnInit() {
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
        //this.veNotas();
      }
    )
  }

  addTeamView(){
    this.add=true;
    this.view= false;
  }

  viewTeams(){
    this.add=false;
    this.view= true;
  }


  addTeam(){
    let newTeam={
      name: this.nombre,
      logoImg:this.logoImg,
      estadiumImg: this.estadioImg,
      localization:this.localization,
      cups:this.copas,
      description:this.descrip,
      fundation:this.fechaFundac
    }
    this.teamServ.addTeam(newTeam);
    Swal("Bien!", "Nota agregada Correctamente", "success");
    this.viewTeams();

  }

  deleteTeam(){

  }

  updateTeam(){

  }

}
