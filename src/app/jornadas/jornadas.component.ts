import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import {DaytripsService} from '../services/daytrips.service';
import { TournamentService } from '../services/tournament.service';
import { TeamService } from '../services/team.service';
import {PositionTableService} from '../services/position-table.service';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {

  constructor( private tablePosit:PositionTableService, private dayServ:DaytripsService, private tournServ:TournamentService,
    private authServ:AuthService,private teamsServ:TeamService) { }

  loading:boolean=true; //Spinner
  create:boolean = false;
  newMatch:boolean=false;
  matchReady:boolean= false;
  formActivate:boolean=true;
  ver:boolean= true;
  addResult:boolean = false;
  showBtnAdd:boolean= false;

  //Listas de datos
  listaIntermedia:any=[];
  jornadaList:any=[];

  listaIntermediaDos:any=[];
  torneoList:any=[];

  listaIntermediaCuatro:any=[];
  tableList:any=[];

  listaIntermediaTres:any=[];
  equiposList:any=[];
  matchsJornada:any=[];
  jornadasSinResult:any =[];
  //tableActual:any=[];

  tablaActual:any=[]; //Tabla de posicion actual

  //Ngmodel
  torneo="";
  name="";
  fechaInicio="";
  fechaFin="";
  teamVisita="";
  teamLocal="";
  fechaMatch="";
  sedeMatch="";
  typeJornada="";



  ngOnInit() {
    this.loading= true;
    this.showBtnAdd= false;

    this.tournServ.getTournament().snapshotChanges()
    .subscribe(
      Torneo =>{
        this.torneoList=[]; // Resetea arreglo
        this.listaIntermediaDos=[];
        this.listaIntermediaDos.push(Torneo);
        for(var i=0; i<this.listaIntermediaDos[0].length;i++){
          let noteI={
             key: this.listaIntermediaDos[0][i].key,
             data:this.listaIntermediaDos[0][i].payload.toJSON()
          }
          this.torneoList.push(noteI);
        }

      }
    )

    this.teamsServ.getTeam().snapshotChanges()
    .subscribe(
      Team =>{
        this.equiposList=[]; // Resetea arreglo
        this.listaIntermediaTres=[];
        this.listaIntermediaTres.push(Team);
        for(var i=0; i<this.listaIntermediaTres[0].length;i++){
          let noteI={
             key: this.listaIntermediaTres[0][i].key,
             data:this.listaIntermediaTres[0][i].payload.toJSON()
          }
          this.equiposList.push(noteI);
        }
        //this.obtenerTorneoActual();
      }
    )

    this.dayServ.getDayTrips().snapshotChanges()
    .subscribe(
      Day =>{
        this.jornadaList=[]; // Resetea arreglo
        this.listaIntermedia=[];
        this.listaIntermedia.push(Day);
        for(var i=0; i<this.listaIntermedia[0].length;i++){
          let noteI={
             key: this.listaIntermedia[0][i].key,
             data:this.listaIntermedia[0][i].payload.toJSON()
          }
          this.jornadaList.push(noteI);
        }
        //this.obtenerTorneoActual();
      }
    )

    this.tablePosit.getPositionTable().snapshotChanges()
    .subscribe(
      Day =>{
        this.tableList=[]; // Resetea arreglo
        this.listaIntermediaCuatro=[];
        this.listaIntermediaCuatro.push(Day);
        for(var i=0; i<this.listaIntermediaCuatro[0].length;i++){
          let noteI={
             key: this.listaIntermediaCuatro[0][i].key,
             data:this.listaIntermediaCuatro[0][i].payload.toJSON()
          }
          this.tableList.push(noteI);
        }

      }
    )


  }

  nuevoPartido(){
    this.newMatch= true;
  }

  addJornada(){
    this.create=true;
    this.ver=false;
    this.addResult=false;
  }

  verJornada(){
    this.create=false;
    this.ver=true;
    this.addResult=false;
  }
  addResultado(){
    this.create=false;
    this.ver=false;
    this.addResult=true;
    this.mostrarJornadasSinResultado();

  }

  addMatch(){
    if(this.teamLocal == this.teamVisita  || this.teamLocal==""  || this.teamVisita== ""){
      Swal('Oops...', 'Debe de seleccioanr equipos diferentes', 'error');
    }else{

      let idVisita = (<HTMLInputElement>document.getElementById("visit")).value;  // Se obtienen los ids
      let idLocal = (<HTMLInputElement>document.getElementById("local")).value;   // de los equipos del partido
      let nombreLocal= this.obtieneNombreEquipo(idLocal);
      let nombreVisita= this.obtieneNombreEquipo(idVisita);


      let json ={
        estatus:"En espera",
        date:this.fechaMatch,
        sede:this.sedeMatch,
        idTeamVisita:idVisita,
        idTeamLocal:idLocal,
        nameLocalTeam:nombreLocal,
        nameVisitTeam: nombreVisita,
        resultVisit:"-",
        resultLocal:"-"
      }
      this.matchsJornada.push(json);
      this.matchReady= true;
      Swal('Bien!', 'Partido agregado a la jornada Correctamente', 'success');
      this.newMatch=false;
    }

  }

  obtieneNombreEquipo(key){
    for(var i=0; i<this.equiposList.length;i++){
      if(this.equiposList[i].key == key ){
          return this.equiposList[i].data.name;
      }
    }
  }

  eliminarJornada(jornada){
    this.dayServ.deleteDayTrip(jornada.key);
    Swal('Bien!', 'Jornada eliminada correctamente', 'success');
  }


  createjournal(){

    let idTorneo = (<HTMLInputElement>document.getElementById("torneo")).value;
    let tipo =  (<HTMLInputElement>document.getElementById("typeJornada")).value;

    let json={
      idTournament:idTorneo,
      matchs:this.matchsJornada,
      cantidad: this.matchsJornada.length,
      name:this.name,
      dateBegin: this.fechaInicio,
      dateEnd: this.fechaFin,
      typeJornada:tipo
    }
    this.dayServ.addDayTrip(json);
    Swal('Bien!', 'Jornada creada correctamente', 'success');

  }


  ocultaForm1(){
    this.formActivate= false;
  }

  muestraForm1(){
    this.formActivate= true;
  }

  confirmInfo(){
    this.formActivate= false;
    this.showBtnAdd= true;
  }

  mostrarPartidosJornada(idJornada){
  // Se crea el html
  let html="<div style='margin-left:2%;margin-right:2%'> </br> ";

  for (let i = 0; i < idJornada.data.cantidad; i++) {
    html = html+ "<p style ='color:green;text-decoration: none;'> "+ idJornada.data.matchs[i].nameLocalTeam+ "<span style='color:grey;font-size:10px'> </span>";
    html = html + "<span style='width: 20px; height: 25px; margin:auto; display: inline-block; border: 2px solid gray; vertical-align: middle; border-radius: 5px;color:black'> "+ idJornada.data.matchs[i].resultLocal +"</span> ";
    html = html + " VS "+"<span style='width: 20px; height: 25px; margin:auto; display: inline-block; border: 2px solid gray; vertical-align: middle; border-radius: 5px;color:black'> "+ idJornada.data.matchs[i].resultVisit +"</span> ";
    html = html +  "<span style='color:green;text-decoration: none;'>"+ idJornada.data.matchs[i].nameVisitTeam +" </span>";


    html= html + "<small style=' margin-left:1%; color:grey'>"+ idJornada.data.matchs[i].estatus +"</small>";
    html= html +"<hr style='border: 1px solid grey;'>";

  }
   html= html +"</div>";

  (<HTMLInputElement>document.getElementById(idJornada.key)).innerHTML = html;  //Obtiene el id de la jornada
  }



  desplegarForm(id){
    // if ((<HTMLInputElement>document.getElementById("res"+id)).style.visibility == "visible"){
    //   (<HTMLInputElement>document.getElementById("res"+id)).style.visibility = "hidden";
    // }else{
      (<HTMLInputElement>document.getElementById("res"+id)).style.visibility = "visible";
    // }
  }

  obtieneNombreTorneo(idTorneo){
      for(let i=0; i< this.torneoList.length;i++){
       if(this.torneoList[i].key == idTorneo){
          return this.torneoList[i].data.name;
        }
      }
  }


  mostrarJornadasSinResultado(){
    this.jornadasSinResult = [];
    for(let i=0; i< this.jornadaList.length; i++){
      for( let n=0; n< this.jornadaList[i].data.cantidad; n++){
        if(this.jornadaList[i].data.matchs[n].estatus == "En espera"){

          let nombreTorneo = this.obtieneNombreTorneo(this.jornadaList[i].data.idTournament);

          let json ={
            jornada:this.jornadaList[i].data.name,
            idJornada:this.jornadaList[i].key,
            dataJornada: this.jornadaList[i],
            data:this.jornadaList[i].data.matchs[n],
            name: nombreTorneo
          }
          this.jornadasSinResult.push(json);
          // Añade en lista los partidos a lista para utilizar
        }
      }
    }
  }


  obtenerTablaPosicionesActual(idTorneo){
    // Con base a las tablas de posiciones y un id del torneo unico, se halla la que se debe de actualizar
    for(let i=0; i < this.tableList.length;i++){
      if(this.tableList[i].data.idTournamnet === idTorneo){
        this.tablaActual= this.tableList[i]; // guarda en variable la tabal de posiciones a utilizar
        return;
      }
    }
  }

  sumaa(a:any,b:any){
      let r:number = <number><any>a +<number><any>b;
      return r;
  }

  avgg(actual:number,a:number,b:number){ // actual,favor,contra
    let r:number = <number><any>actual +<number><any>a;
    r = r - <number><any>b;
    return r;
  }



  resultadoJornada(match,num){
    let local=(<HTMLInputElement>document.getElementById("local"+num)).value;
    let visita= (<HTMLInputElement>document.getElementById("visita"+num)).value;
    let localC = local;
    let visitaC = visita;

    if(<number><any>visita <10){
        visitaC= "0"+visitaC;
    }
    if(<number><any>local <10){
      localC= "0"+localC;
  }

    // let local = <number><any>localS;    //se realiza conversion de
    // let visita = <number><any>visitaS;  //String a Int


    let matchOld = this.jornadasSinResult[num].data; // Se obtiene el partido correspondiente
    let jornada = match.dataJornada;
    let idTorneo = jornada.data.idTournament; // Id del torno para obtener tabla de posiciones a usar
    this.obtenerTablaPosicionesActual(idTorneo);  // Lamma metodo para obtener la tabla  edposicion a utilizar

    //Primero se debe de actualizar el partido, despues la jornada en total
    matchOld.resultLocal= local;
    matchOld.resultVisit= visita;
    let idLocal = matchOld.idTeamLocal;
    let idVisita= matchOld.idTeamVisita;


    //Se compara el resultado del partido
    if(localC == visitaC  && jornada.data.typeJornada=="Regular"){//Empate
      console.log("Empate");

      for(let i=0; i<this.tablaActual.data.cantidad;i++){
        if(this.tablaActual.data.teams[i].idTeam == idLocal){
            //realiza el incremento en partido empatados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pts = this.tablaActual.data.teams[i].pts+1;
          this.tablaActual.data.teams[i].pe = this.tablaActual.data.teams[i].pe+1;
          this.tablaActual.data.teams[i].pj = this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>local;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>visita;
          let r2 = this.sumaa(a2,b2);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;


        }
        if(this.tablaActual.data.teams[i].idTeam == idVisita){
          //realiza el incremento en partido empatados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pts = this.tablaActual.data.teams[i].pts+1;
          this.tablaActual.data.teams[i].pe = this.tablaActual.data.teams[i].pe+1;
          this.tablaActual.data.teams[i].pj = this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>visita;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>local;
          let r2 = this.sumaa(a2,b2);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;
        }
      }
    }


    if(<number><any>localC > <number><any>visitaC   && jornada.data.typeJornada=="Regular" ){//Gana local
      console.log("Local");
      for(let i=0; i<this.tablaActual.data.cantidad;i++){
        if(this.tablaActual.data.teams[i].idTeam === idLocal){
            //realiza el incremento en partido ganados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pts = <number><any>this.tablaActual.data.teams[i].pts+3;
          this.tablaActual.data.teams[i].pg = <number><any>this.tablaActual.data.teams[i].pg+1;
          this.tablaActual.data.teams[i].pj = <number><any>this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>local;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>visita;
          let r2 = this.sumaa(a2,b2);
          let actual = <number><any>this.tablaActual.data.teams[i].avg;
          let a3:number = <number><any>local;
          let b3:number= <number><any>visita;
          let r3 = this.avgg(actual,a3,b3);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;
          this.tablaActual.data.teams[i].avg = r3;
        }

        if(this.tablaActual.data.teams[i].idTeam === idVisita){
          //realiza el incremento en partido ganados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pp = <number><any>this.tablaActual.data.teams[i].pp+1;
          this.tablaActual.data.teams[i].pj = <number><any>this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>visita;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>local;
          let r2 = this.sumaa(a2,b2);
          let actual = <number><any>this.tablaActual.data.teams[i].avg;
          let a3:number = <number><any>visita;
          let b3:number= <number><any>local;
          let r3 = this.avgg(actual,a3,b3);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;
          this.tablaActual.data.teams[i].avg = r3;
        }
      }
    }


    if(<number><any>localC < <number><any>visitaC   && jornada.data.typeJornada=="Regular"){//Gana Visita
      console.log("Visita");
      for(let i=0; i<this.tablaActual.data.cantidad;i++){
        if(this.tablaActual.data.teams[i].idTeam === idLocal){
            //realiza el incremento en partido ganados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pp = <number><any>this.tablaActual.data.teams[i].pp+1;
          this.tablaActual.data.teams[i].pj = <number><any>this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>local;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>visita;
          let r2 = this.sumaa(a2,b2);
          let actual = <number><any>this.tablaActual.data.teams[i].avg;
          let a3:number = <number><any>local;
          let b3:number= <number><any>visita;
          let r3 = this.avgg(actual,a3,b3);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;
          this.tablaActual.data.teams[i].avg = r3;
        }

        if(this.tablaActual.data.teams[i].idTeam === idVisita){
          //realiza el incremento en partido ganados, puntos, goles favor y en contra
          this.tablaActual.data.teams[i].pts = <number><any>this.tablaActual.data.teams[i].pts+3;
          this.tablaActual.data.teams[i].pg = <number><any>this.tablaActual.data.teams[i].pg+1;
          this.tablaActual.data.teams[i].pj = <number><any>this.tablaActual.data.teams[i].pj+1;

          let a1:number = <number><any>this.tablaActual.data.teams[i].gf;
          let b1:number= <number><any>visita;
          let r1 = this.sumaa(a1,b1);
          let a2:number = <number><any>this.tablaActual.data.teams[i].gc;
          let b2:number= <number><any>local;
          let r2 = this.sumaa(a2,b2);
          let actual = <number><any>this.tablaActual.data.teams[i].avg;
          let a3:number = <number><any>visita;
          let b3:number= <number><any>local;
          let r3 = this.avgg(actual,a3,b3);

          this.tablaActual.data.teams[i].gf = r1;
          this.tablaActual.data.teams[i].gc = r2;
          this.tablaActual.data.teams[i].avg = r3;
        }
      }
    }

      let newTable= this.tablaActual.data;

      this.nuevasPosiciones(newTable,this.tablaActual.key);
      this.actualizaJornada(jornada,matchOld);

  }


  nuevasPosiciones(table,key){
      let ordenados:any  = this.metodoBurbuja(table.teams,table.cantidad);
      let newPositions:any=[];

      let pos= 1;
      for (let i = table.cantidad-1; i>-1; i--) {
        let match = ordenados[i];
        match.position = pos;
        newPositions.push(match);
        pos++;
      }
      table.teams= newPositions;
      this.tablePosit.updatePositionTable(table,key); //Actualiza tabla de posiciones
  }

   metodoBurbuja(miArray,cant){  //Metodo de ordenamiento para las posiciones de los equipos en tabla
		for(var i=1;i<cant;i++)
		{
			for(var j=0;j<(cant-i);j++)
			{
        //console.log(". ",miArray[j].pts+"  "+ miArray[j+1].pts);
				if(miArray[j].pts>miArray[j+1].pts)
				{
					let k=miArray[j+1];
					miArray[j+1]=miArray[j];
					miArray[j]=k;
				}
			}
		}
		return miArray; //Retrona el array ordenado
	}



  actualizaJornada(jornada,matchOld){
    for(let i=0; i< jornada.data.cantidad;i++){
      if(jornada.data.matchs[i].idTeamLocal == matchOld.idTeamLocal && jornada.data.matchs[i].idTeamVisita == matchOld.idTeamVisita ){
        // Si se halla el equipo que coincide con los id's del partido, se actualiza
        jornada.data.matchs[i] = matchOld;
        jornada.data.matchs[i].estatus ="Finalizado";

        let jornadaN={  //Nuevo Json De Jornada
          idTournament:jornada.data.idTournament,
          matchs:jornada.data.matchs,
          cantidad: jornada.data.cantidad,
          name:jornada.data.name,
          dateBegin: jornada.data.dateBegin,
          dateEnd: jornada.data.dateEnd,
          typeJornada:jornada.data.typeJornada
        };

        this.dayServ.updateDayTrip(jornadaN,jornada.key ); //Llama al servicio para actualizar

        Swal('Bien!', 'Resultado agregado Correctamente!!', 'success');
        this.mostrarJornadasSinResultado(); // Vuelve a llamar funcion para traer los partidos sin resultados
        break;
      }
    }

  }

}
