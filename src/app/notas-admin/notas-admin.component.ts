import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas-admin',
  templateUrl: './notas-admin.component.html',
  styleUrls: ['./notas-admin.component.css']
})
export class NotasAdminComponent implements OnInit {

  constructor() { }

  // Variables bandera para CRUD de notas
  createNote:boolean= true;
  deleteNote:boolean= false;
  updateNote:boolean= false;
  readNote:boolean= false;


  ngOnInit() {
  }

  creaNota(){
    this.createNote= true;
    this.deleteNote=false;
    this.readNote=false;
    this.updateNote=false;
  }

  veNotas(){
    this.createNote= false;
    this.deleteNote=false;
    this.readNote=true;
    this.updateNote=false;
  }

}
