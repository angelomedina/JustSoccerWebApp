import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private firebase:AngularFireDatabase) { }

  tournamentList:AngularFireList<any>;

  public getTournament(){ // Obtiene todods las notas de la DB
    return this.tournamentList= this.firebase.list('tournament');
  }

  addTournament(Tournament){  // Realiza la inserción de una nota en la DB
    this.tournamentList.push(Tournament);
  }

  deleteTournament(idTournament){
    this.tournamentList.remove(idTournament);
  }

  updateTournament(Tournament){
    this.firebase.database.ref('team/'+Tournament.key).set(Tournament);
  }
}
