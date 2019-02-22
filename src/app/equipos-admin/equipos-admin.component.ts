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
  keyTeamActual="";

  nombreIMG="";
  nombreIMGStadium="";

  add= false;
  view=true;
  update:boolean= false;
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


   deleteTeam(team){   //Eliminar equipo .... debe de implementarse bajar de categoria
      Swal({
        title: 'Eliminar equipo',
        text: "En serio desea eliminar este equipo del sistema? No será posible recuperarlo en caso de eliminarlo!!",
        imageUrl: team.data.logoImg,
        imageWidth: 150,
        imageHeight: 150,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!'
      }).then((result) => {
        if (result.value) {
          Swal(
            'Elimiando!',
            'El quipo ha sido eliminado correcatmente',
            'success'
          )
          this.teamServ.deleteTeam(team.key);
        }
      })
    
   }

   updateTeam(team){
      this.update=true;
      this.view= false;
      this.nombre= team.data.name;
      this.localization= team.data.localization;
      this.copas = team.data.cups;
      this.descrip= team.data.description;
      this.fechaFundac= team.data.fundation;
      this.urlLogo= team.data.logoImg
      this.urlLogoStadium= team.data.estadiumImg;
      this.keyTeamActual= team.key;

   }

   updateT(){
    let newTeam={
      name: this.nombre,
      logoImg:this.urlLogo,
      estadiumImg: this.urlLogoStadium,
      localization:this.localization,
      cups:this.copas,
      description:this.descrip,
      fundation:this.fechaFundac
    }
    this.teamServ.updateTeam(newTeam,this.keyTeamActual);

    Swal("Bien!", "Datos actualizados Correctamente", "success");
    this.cancelUpdate();

   }

   cancelUpdate(){
     this.resetForms();
     this.update= false;
      this.view= true; 
   }

   cancelAdd(){
     this.resetForms();
    this.add= false;
     this.view= true;
  }

  resetForms(){

      this.nombre= "";
      this.localization= "";
      this.copas = 0;
      this.descrip= "";
      this.fechaFundac= "";
      this.urlLogo= "";
      this.urlLogoStadium= "";
  }

}
