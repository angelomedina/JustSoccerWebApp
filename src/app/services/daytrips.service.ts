import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
 //Porque no :'v

@Injectable({
  providedIn: 'root'
})
export class DaytripsService {

  constructor(private firebase:AngularFireDatabase) { }

  dayTripsList:AngularFireList<any>;

  public getDayTrips(){ // Obtiene todods las tablas de la DB
    return this.dayTripsList= this.firebase.list('dayTrips');
  }

  addDayTrip(dayTrip){  // Realiza la inserción de una tabla en la DB
    this.dayTripsList.push(dayTrip);
  }

  deleteDayTrip(idDayTrip){
    this.dayTripsList.remove(idDayTrip);
  }

  updateDayTrip(dayTrip){
    this.firebase.database.ref('dayTrips/'+dayTrip.key).set(dayTrip);
  }
}
