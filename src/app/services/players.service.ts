import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firebase:AngularFireDatabase) { }

  playerList:AngularFireList<any>;

  public getPlayers(){ // Obtiene todods las tablas de la DB ..:'v
    return this.playerList= this.firebase.list('player');
  }

  addPlayer(player){  // Realiza la inserción de una tabla en la DB
    this.playerList.push(player);
  }

  deletePlayer(idPlayer){
    this.playerList.remove(idPlayer);
  }

  updatePlayer(player,key){
    this.firebase.database.ref('player/'+key).set(player);
  }


  
}
