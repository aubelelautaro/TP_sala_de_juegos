import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { HomeComponent } from './components/home/home.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ListadoJugadoresComponent } from './components/listado-jugadores/listado-jugadores.component';
import { MemotestComponent } from './components/memotest/memotest.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { TaTeTiComponent } from './components/ta-te-ti/ta-te-ti.component';

const routes: Routes = [
{
  path:'',
  component: HomeComponent
},
{
  path:'listadoJugadores',
  component: ListadoJugadoresComponent
},
{
  path:'jugadores',
  component: JugadoresComponent
},
{
  path:'juegos',
  component: JuegosComponent,
  children:
  [
    {
      path:'anagrama',
      component: AnagramaComponent
    },
    {
      path:'piedraPapelTijera',
      component: PiedraPapelTijeraComponent
    },
    {
      path:'agilidadAritmetica',
      component: AgilidadAritmeticaComponent
    },
    {
      path:'adivinaElNumero',
      component: AdivinaElNumeroComponent
    },
    {
      path:'taTeTi',
      component: TaTeTiComponent
    },
    {
      path:'memotest',
      component: MemotestComponent
    },
  ]
},
{
  path:'**',
  component: NotFoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
