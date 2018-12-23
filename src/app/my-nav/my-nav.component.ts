import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
})
export class MyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    logueado:boolean;  // bandera Beta pueba de login

  constructor(private breakpointObserver: BreakpointObserver, private authser:AuthService,private router: Router ) {
    //this.name= this.authser.usserLogged.data.name;

  }

  name="";




  logout(){
    this.authser.removeUserLoggedIn();
    //Implementar alert para cerrar sesion
    Swal("Bien!", "Cierre de Sesión realizado Correctamente", "success");
    this.router.navigateByUrl('/home');
  }

}
