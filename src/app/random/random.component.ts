import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from "@angular/router";
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor( private authserv:AuthService, private userServ:UsersService, private router:Router) {
    
   }

  //Lista de Datos
  listaIntermedia:any=[];
  allList:any=[];
  usersList:any=[];

  spinner:boolean = false; 
  win:boolean = false;
  winnerName:string ="";
  winnerEmail:string ="";
  winnerPhone:string ="";
  winnerImg:string="";

  ngOnInit() {
    //console.log( " ", this.authserv.userType)
    if (this.authserv.userType == "publicUser" || this.authserv.userType== undefined ){
      this.router.navigateByUrl('/GG');
    }

    this.userServ.getUsers().snapshotChanges()
    .subscribe(
      User =>{
        this.allList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(User);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let userI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.allList.push(userI);
        }
        this.filterNormalUsers();
        //this.usersList.push(User); // Inserta los users en array
      }
    )

  }
  
  filterNormalUsers(){
    this.usersList= [];
    for (let i = 0; i < this.allList.length; i++) {
      if (this.allList[i].data.type== "mobileVisitor"){
        this.usersList.push(this.allList[i]);
      }
    }
  }

  generarWinner(){
    this.win= false;
    this.spinner= true;
    setTimeout(() => {
      let win = Math.floor(Math.random() * this.usersList.length);
      this.winnerName = this.usersList[win].data.name + " "+ this.usersList[win].data.surnameI + " "+  this.usersList[win].data.surnameII;
      this.winnerEmail = this.usersList[win].data.email;
      this.winnerPhone = this.usersList[win].data.telephone;
      this.winnerImg= this.usersList[win].data.img;
      this.spinner= false;
      this.win=true;
    }, 2100);
  }

  generaOtroWinner(){
    this.win= false;
  }


}
 
