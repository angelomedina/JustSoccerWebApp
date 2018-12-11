import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegistroComponent} from './registro/registro.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { EstadisticaAdminComponent } from './estadistica-admin/estadistica-admin.component';
import { TorneosComponent } from './torneos/torneos.component';
import { EquiposAdminComponent } from './equipos-admin/equipos-admin.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



// arreglo de rutas
const APP_ROUTES: Routes =[
    { path: 'home', component: HomeComponent},
    { path: 'authUser', component: RegistroComponent},
    { path: 'journalAdmin', component: JornadasComponent},
    { path: 'stadisticsAdmin', component: EstadisticaAdminComponent},
    { path: 'tournamentAdmin', component: TorneosComponent},
    { path: 'teamsAdmin', component: EquiposAdminComponent},
    { path: 'notesAdmin', component: NotasAdminComponent},
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);
