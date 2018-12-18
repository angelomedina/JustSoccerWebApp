import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { UsersService } from '../services/users.service';

import {userModel} from '../models/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private userServ:UsersService,private router: Router, private authServ:AuthService) { }

  // Banderas *ngIf
  registro:boolean= false;
  login:boolean= true;

  //Lista de Datos
  //usersList : userModel[]=[];
  listaIntermedia:any=[];
  usersList:any=[];

  // Variables NGModel
  user={}
  email="";
  password="";
  confirmPasw=""
  name="";
  firstLastN="";
  secondLastN="";
  telefono="";

  ngOnInit() {
    this.userServ.getUsers().snapshotChanges()
    .subscribe(
      User =>{
        this.usersList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(User);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let userI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }

          this.usersList.push(userI);
        }
        //this.usersList.push(User); // Inserta los users en array
      }
    )

  }

  pressLogin(){  // Validar opcion elegida por User
    this.login= true;
    this.registro=false;
  }

  pressRegistro(){ // Validar opcion elegida por User
    this.login= false;
    this.registro=true;
  }


  loginUser(){
    if(this.email =="" || this.password==""){
      Swal('Oops...', 'No se permiten valores vacíos', 'error');
    }else{
      let success = this.verificaLogin(this.email, this.password);
      if(success==true){
        Swal("Bien!", "Login realizado Correctamente", "success");
        this.router.navigate(['home']);
      }else{
        Swal('Oops...', 'Credenciales Incorrecatas', 'error');
        this.router.navigateByUrl('/home');
       //
      }

    }

  }

  registerUser(){

     if(this.name == "" || this.firstLastN=="" || this.secondLastN=="" || this.email=="" || this.password==""){
      Swal('Oops...', 'No se permiten valores vacíos', 'error');
     }else{
       if(this.password  != this.confirmPasw){
        Swal('Oops...', 'Las contraseñas ingresadas no coinciden.', 'error');
       }else{
        this.user={
          name:this.name,
          surnameI:this.firstLastN,
          surnameII:this.secondLastN,
          email:this.email,
          password:this.password,
          telephone:this.telefono,
          type:"publicUser"
        }
        this.userServ.addUser(this.user);
        Swal("Bien!", "Usuario registrado Correctamente!", "success");
        //console.log("Registro ", this.user);
        this.resetForm();
        this.router.navigate(['/authUser']);

       }
     }
  }


  resetForm(){
    this.email="";
    this.confirmPasw="";
    this.firstLastN="";
    this.name="";
    this.telefono="";
    this.secondLastN="";
    this.password="";
  }

  verificaLogin(email,pass){
    for (var i=0;i<this.usersList.length;i++){
      if(this.usersList[i].data.email == email && this.usersList[i].data.password== pass){
        this.authServ.setUserLoggedIn(this.usersList[i]);
        return true;
      }
    }
    return false;
  }




}
