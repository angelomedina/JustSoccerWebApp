import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TeamService} from '../services/team.service';
import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.css']
})
export class EquiposAdminComponent implements OnInit {

  constructor(private authServ:AuthService, private teamServ:TeamService, private storage:AngularFireStorage) { }

  //Datos ngModel
  nombre="";
  logoImg="";
  estadioImg="";
  fechaFundac="";
  localization="";
  copas=0;
  descrip="";

  nombreIMG="";
  nombreIMGStadium="";

  add= false;
  view=true;
  loading= true; // Spinner Loading

  //Listas de datos
  listaIntermedia:any=[];
  teamList:any=[];

  // Observables
  uploadPercent:Observable<number>;
  urlImg:Observable<String>;
  uploadPercentStaddium:Observable<number>;
  urlImgStadium:Observable<String>;

  urlLogoStadium:any;
  urlLogo:any;

  ngOnInit() {
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
        //console.log("" ,this.teamList);
        this.loading=false;
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
    this.urlImg.subscribe(val =>{
      this.urlLogo= val;

      this.urlImgStadium.subscribe(val2 =>{
        this.urlLogoStadium=val2;

      let newTeam={
        name: this.nombre,
        logoImg:this.urlLogo,
        estadiumImg: this.urlLogoStadium,
        localization:this.localization,
        cups:this.copas,
        description:this.descrip,
        fundation:this.fechaFundac
      }
      this.teamServ.addTeam(newTeam);
      Swal("Bien!", "Nota agregada Correctamente", "success");
      this.viewTeams();
    })
  });



  }

  upload(e){  // Metodo para realiozar la subida de la imagen a FireStore
    let file = e.target.files[0];
    this.nombreIMG= file.name;
    let path="/clubs/"+file.name;
    let ref = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>{
      this.urlImg= ref.getDownloadURL()
    } ) ).subscribe();
  }

  uploadstadium(e){  // Metodo para realiozar la subida de la imagen a FireStore
    let file = e.target.files[0];
    this.nombreIMGStadium= file.name;
    let path="/estadiums/"+file.name;
    let ref = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    this.uploadPercentStaddium= task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>{
      this.urlImgStadium= ref.getDownloadURL()
    } ) ).subscribe();
  }


  // deleteTeam(){   //Eliminar o bajar de categoria

  // }

  // updateTeam(){

  // }

}
