import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegistroComponent} from './registro/registro.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { EstadisticaAdminComponent } from './estadistica-admin/estadistica-admin.component';
import { TorneosComponent } from './torneos/torneos.component';
import { EquiposAdminComponent } from './equipos-admin/equipos-admin.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { NotaInfoComponent } from './nota-info/nota-info.component';
import { AboutComponent } from './about/about.component';
import { MultimediaComponent } from './multimedia/multimedia.component';

// arreglo de rutas
const APP_ROUTES: Routes =[
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'authUser', component: RegistroComponent},
    { path: 'journalAdmin', component: JornadasComponent},
    { path: 'stadistics/:id', component: EstadisticaAdminComponent},
    { path: 'tournament', component: TorneosComponent},
    { path: 'teams', component: EquiposAdminComponent},
    { path: 'notes', component: NotasAdminComponent},
    { path: 'teamInfo/:id', component: TeamInfoComponent},
    { path: 'noteInfo/:id', component: NotaInfoComponent},
    { path: 'about', component: AboutComponent},
    { path: 'multimedia', component: MultimediaComponent},
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);
