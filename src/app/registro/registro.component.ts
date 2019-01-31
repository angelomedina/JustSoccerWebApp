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
  adminUse:boolean; // Verifica si es sel superadmin que usa View
  adminRegistro:boolean= false;
  myAdminView:boolean=true;

  //Lista de Datos
  listaIntermedia:any=[];
  usersList:any=[];
  adminList:any=[]; // Lista para alamcenar a los superAdmins del Sistema

  // Variables NGModel
  user={}
  email="";
  password="";
  confirmPasw=""
  name="";
  firstLastN="";
  secondLastN="";
  telefono="";

  ngOnInit() {  // Inicializa Vista

    if(this.authServ.userType=="superAdmin" ){
      this.adminUse=true;  // Si en la vista ingresa un superAdmin, se habilita la opcion
      this.myAdminView=true;
    }else{
      this.adminUse=false;  //para registrar otros administradores
    }

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
        this.filterAdmin();
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

  pressMyAdmins(){
    this.filterAdmin();
    this.myAdminView= true;
    this.adminRegistro= false;
  }

  pressRegistroAdmin(){
    this.myAdminView= false;
    this.adminRegistro= true;
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

         let typeU="";  // Se verifica el tipo de User a registrar
         if(this.authServ.userType== "superAdmin"){
           typeU= "admin";
         }else{
           typeU= "publicUser";
         }

        this.user={
          name:this.name,
          surnameI:this.firstLastN,
          surnameII:this.secondLastN,
          email:this.email,
          password:this.password,
          telephone:this.telefono,
          type:typeU
        }

        for(let i=0; i<this.usersList.length;i++){
          if(this.usersList[i].data.email == this.email){
            Swal("Oooops!", "Correo electronico  se encuentra asociado a un usuario. Intente con otro distinto.", "error");
            return;
          }
        }

        this.userServ.addUser(this.user);
        Swal("Bien!", "Usuario registrado Correctamente!", "success");
        this.resetForm();
        this.router.navigate(['/authUser']);

       }
     }
  }

  addAdminEmail(){
    let emailUser = (<HTMLInputElement>document.getElementById("emailVerif")).value;
    for(let i=0; i<this.usersList.length;i++){
      if(this.usersList[i].data.email == emailUser){
        this.usersList[i].data.type = "admin";
        this.userServ.updateUser(this.usersList[i].data,this.usersList[i].key );
        Swal("Bien!", "Nuevo administrado asignado Correctamente!", "success");
        return;
      }
    }
    Swal("Oooops!", "Correo electronico no se encuentra asociado a ningún usuario", "error");

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

  filterAdmin(){ // metodo para utilizar unicamente los administradores en una lista
    this.adminList=[];
    for(var i=0; i< this.usersList.length;i++){
      if(this.usersList[i].data.type=="admin"){
        this.adminList.push(this.usersList[i]);
      }
    }
  }

  delegarAdmin(admin){

    let user={
      name:admin.data.name,
      surnameI:admin.data.surnameI,
      surnameII:admin.data.surnameII,
      email:admin.data.email,
      password:admin.data.password,
      telephone:admin.data.telephone,
      type:"publicUser"
    }
    this.userServ.updateUser(user,admin.key);

    Swal("Bien!", "El usuario seleccionado ya no dispondrá de privilegios administrativos!", "success");
    this.filterAdmin();


  }




}
