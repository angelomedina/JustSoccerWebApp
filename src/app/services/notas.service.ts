import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private firebase:AngularFireDatabase) { }

  notesList:AngularFireList<any>;

  public getNotes(){ // Obtiene todods las notas dela DB
    return this.notesList= this.firebase.list('notes');
  }

  addNote(note){  // Realiza la inserción de una nota en la DB
    this.notesList.push(note);
  }

  deleteNote(idNote){
    this.notesList.remove(idNote);
  }

  updateNote(note){
    this.firebase.database.ref('notes/'+note.key).set(note);
  }
}
