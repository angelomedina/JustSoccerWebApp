import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { EditorModule } from '@tinymce/tinymce-angular';

// Conexion con FireBase
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




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
    NotasAdminComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EditorModule,
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
    MatListModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'JustSoccerWebApp')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
