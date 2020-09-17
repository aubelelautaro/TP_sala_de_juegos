import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ListadoJugadoresComponent } from './components/listado-jugadores/listado-jugadores.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
  path:'**',
  component: NotFoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
