import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firebase:AngularFireDatabase) { }

  notesList:AngularFireList<any>;

  public getTeam(){ // Obtiene todods las notas de la DB
    return this.notesList= this.firebase.list('team');
  }

  addTeam(team){  // Realiza la inserción de una nota en la DB
    this.notesList.push(team);
  }

  deleteTeam(idTeam){
    this.notesList.remove(idTeam);
  }

  updateTeam(team){
    this.firebase.database.ref('team/'+note.key).set(team);
  }

}
