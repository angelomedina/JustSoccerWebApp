import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegistroComponent} from './registro/registro.component';


// arreglo de rutas
const APP_ROUTES: Routes =[
    { path: 'home', component: HomeComponent},
    { path: 'authUser', component: RegistroComponent},
    { path: '**',pathMatch: 'full', redirectTo:'home' }
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);
