import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ListadoJugadoresComponent } from './components/listado-jugadores/listado-jugadores.component';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import { HttpService } from './service/http.service';
import { AuthService } from './service/auth.service';

import { MapaComponent } from './utils/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { TaTeTiComponent } from './components/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './components/memotest/memotest.component';


import{ HttpClientModule } from '@angular/common/http';1
import { ListadoComponent } from './components/pages/listado/listado.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JuegosComponent,
    NotFoundComponent,
    JugadoresComponent,
    ListadoJugadoresComponent,
    MapaComponent,
    LoginComponent,
    AnagramaComponent,
    PiedraPapelTijeraComponent,
    AgilidadAritmeticaComponent,
    AdivinaElNumeroComponent,
    TaTeTiComponent,
    MemotestComponent,
    ListadoComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: 
  [
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
