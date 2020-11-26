import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticasService } from 'src/app/service/estadisticas.service';


@Component({
  selector: 'app-listado-jugadores',
  templateUrl: './listado-jugadores.component.html',
  styleUrls: ['./listado-jugadores.component.scss']
})
export class ListadoJugadoresComponent implements OnInit {

  breakpoint: number;
  alturaColumnas: string;

  anagrama: any;
  ppt: any;
  aa: any;
  an: any;
  tateti: any;
  memotest: any;
  juegoAlumno: any;

  constructor(
    private router: Router,
    public estadisticas: EstadisticasService
  ){}

  ngOnInit(): void {

    this.estadisticas.getEstadisticas('anagrama').subscribe((data) => {
      this.anagrama = data;
    });
    this.estadisticas.getEstadisticas('piedraPapelTijera').subscribe((data) => {
      this.ppt = data;
    });
    this.estadisticas.getEstadisticas('agilidadAritmetica').subscribe((data) => {
      this.aa = data;
    });
    this.estadisticas.getEstadisticas('adivinaNumero').subscribe((data) => {
      this.an = data;
    });
    this.estadisticas.getEstadisticas('tateti').subscribe((data) => {
      this.tateti = data;
    });
    this.estadisticas.getEstadisticas('memotest').subscribe((data) => {
      this.memotest = data;
    });
    this.estadisticas.getEstadisticas('juegoAlumno').subscribe((data) => {
      console.log(data);
      this.juegoAlumno = data;
    });


    this.estadisticas.getEstadisticasJugador('anagrama');
    this.estadisticas.getEstadisticasJugador('piedraPapelTijera');
    this.estadisticas.getEstadisticasJugador('agilidadAritmetica');
    this.estadisticas.getEstadisticasJugador('adivinaNumero');
    this.estadisticas.getEstadisticasJugador('tateti');
    this.estadisticas.getEstadisticasJugador('memotest');
    this.estadisticas.getEstadisticasJugador('juegoAlumno');
  }
 
}
