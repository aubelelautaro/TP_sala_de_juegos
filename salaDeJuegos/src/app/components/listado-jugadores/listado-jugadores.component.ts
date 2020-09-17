import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../clases/jugador';
const ELEMENTOS: Jugador[] = [
  {indice: 1, nombre: 'Lautaro', puntaje: 10079, juego: 'Ta te ti'},
  {indice: 2, nombre: 'Federico', puntaje: 9526, juego: 'MemoTest'},
  {indice: 3, nombre: 'Agustin', puntaje: 4941, juego: 'asd'},
  {indice: 4, nombre: 'Agustina', puntaje: 2122, juego: 'asdasd'},

];

@Component({
  selector: 'app-listado-jugadores',
  templateUrl: './listado-jugadores.component.html',
  styleUrls: ['./listado-jugadores.component.scss']
})
export class ListadoJugadoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnas: string[] = ['indice', 'jugador', 'puntaje' , 'juego'];
  dataSource = ELEMENTOS;
}
