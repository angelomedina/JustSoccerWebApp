import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firebase:AngularFireDatabase) { }

  listUsers:AngularFireList<any>;

  getUsers(){ // Obtiene todods los Usuarios dela DB
    return this.listUsers= this.firebase.list('user');
   // return this.listUsers.snapshotChanges(); // Observable
  }

  addUser(user){  // Realiza la inserción de un Usuario en la DB
    this.listUsers.push(user);
  }




}
