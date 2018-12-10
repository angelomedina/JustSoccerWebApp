import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';

// Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Global Modulos Angular Material
import {MaterialModule} from './componetMaterial';

//importa archivo de rutas
import {APP_ROUTING} from '../app/app.routes';

// Importa modulo para componentes Globales!!
import { ComponentsModule } from './globalComponents/components.module';

//Importa Componentes
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { FooterComponent } from './footer/footer.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { JornadasComponent } from './jornadas/jornadas.component';
import { TorneosComponent } from './torneos/torneos.component';
import { EstadisticaAdminComponent } from './estadistica-admin/estadistica-admin.component';
import { EquiposAdminComponent } from './equipos-admin/equipos-admin.component';
import { NotasAdminComponent } from './notas-admin/notas-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    FooterComponent,
    MyNavComponent,
    JornadasComponent,
    TorneosComponent,
    EstadisticaAdminComponent,
    EquiposAdminComponent,
    NotasAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
   // HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    APP_ROUTING,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
