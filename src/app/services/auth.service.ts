import { Injectable } from '@angular/core';
import {userModel} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn;
  public usserLogged; // Se seea el objeto user a esta variable
  public userType;

  constructor() {
    let data = this.getUserLoggedIn();  // Se obtiene del localstorage
    if(data != null){
      this.isUserLoggedIn= true;
      this.userType= data.data.type;
      this.setUserLoggedIn(data);  // LLama Metodo para setear en LocalStorage
    }else{
      this.isUserLoggedIn= false;
    }

  }

  returnState(){
    return this.isUserLoggedIn;
  }

  setUserLoggedIn(user) {  // Al realizar login , se guara en localStorage
    this.isUserLoggedIn = true; // Y la bandera de logeo pasará a true
    this.usserLogged = user;
    this.userType= user.data.type;
    localStorage.setItem('currentUser', JSON.stringify(user));

  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser')); // Retorna el objeto User
  }

  removeUserLoggedIn(){ // Cerrar Sesion
    localStorage.clear() // limpia el objeto del localStorage
    this.isUserLoggedIn= false;
    this.userType= "";
  }


}
