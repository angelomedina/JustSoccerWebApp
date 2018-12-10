import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  // Banderas *ngIf
  registro:boolean= false;
  login:boolean= true;

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
      alert("LOGIN :"+ this.email+" "+this.password);
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
          nombre:this.name,
          apellido1:this.firstLastN,
          apellido2:this.secondLastN,
          email:this.email,
          contraseña:this.password,
          telefono:this.telefono
        }
        console.log("Registro ", this.user);

       }
     }

  }




}
