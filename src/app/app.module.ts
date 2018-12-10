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




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    FooterComponent,
    MyNavComponent
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
