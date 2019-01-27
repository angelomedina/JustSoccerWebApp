import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class PositionTableService {

  constructor(private firebase:AngularFireDatabase) { }

  positionTableList:AngularFireList<any>;

  public getPositionTable(){ // Obtiene todods las tablas de la DB
    return this.positionTableList= this.firebase.list('positionTable');
  }

  addPositionTable(table){  // Realiza la inserción de una tabla en la DB
    console.log("recibe: ", table);
    this.positionTableList.push(table);
  }

  deletePositionTable(idtable){
    this.positionTableList.remove(idtable);
  }

  updatePositionTable(table,key){
    this.firebase.database.ref('positionTable/'+key).set(table);
  }

}
