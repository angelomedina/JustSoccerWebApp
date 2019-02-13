import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor( private authserv:AuthService, private userServ:UsersService) { }

  //Lista de Datos
  listaIntermedia:any=[];
  allList:any=[];
  usersList:any=[];

  spinner:boolean = false;
  win:boolean = false;
  winner:string ="";

  ngOnInit() {

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
      if (this.allList[i].data.type== "publicUser"){
        this.usersList.push(this.allList[i]);
      }
    }
  }

  generarWinner(){
    this.win= false;
    this.spinner= true;
    setTimeout(() => {
      let win = Math.floor(Math.random() * this.usersList.length);
      this.winner = this.usersList[win].data.name + " "+ this.usersList[win].data.surnameI + " "+  this.usersList[win].data.surnameII;
      this.spinner= false;
      this.win=true;
    }, 2100);
  }

}
 