import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { ListadoJugadoresComponent } from './components/listado-jugadores/listado-jugadores.component';
import { LoginComponent } from './components/login/login.component';
import { MemotestComponent } from './components/memotest/memotest.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JuegoAlumnoComponent } from './components/juego-alumno/juego-alumno.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { TaTeTiComponent } from './components/ta-te-ti/ta-te-ti.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{
  path:'login',
  component: LoginComponent
},
{
  path:'registro',
  component: RegistroComponent
},
{
  path:'',
  component: AcercaDeComponent,
  canActivate:[AuthGuard]
},
{
  path:'acercaDe',
  component: AcercaDeComponent,
  canActivate:[AuthGuard]
},

{
  path:'listadoJugadores',
  component: ListadoJugadoresComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos',
  component: JuegosComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/anagrama',
  component: AnagramaComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/piedraPapelTijera',
  component: PiedraPapelTijeraComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/agilidadAritmetica',
  component: AgilidadAritmeticaComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/adivinaElNumero',
  component: AdivinaElNumeroComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/taTeTi',
  component: TaTeTiComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/memotest',
  component: MemotestComponent,
  canActivate:[AuthGuard]
},
{
  path:'juegos/juegoAlumno',
  component: JuegoAlumnoComponent,
  canActivate:[AuthGuard]
},
{
  path:'**',
  component: NotFoundComponent,
  canActivate:[AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
