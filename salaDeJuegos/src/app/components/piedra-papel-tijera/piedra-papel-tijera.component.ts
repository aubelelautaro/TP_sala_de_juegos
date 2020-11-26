import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  habemus : boolean = true;
  resultado : string;
  visuales : boolean = true;
  mostrar : boolean = false;
  maquina : any;
  user : any;

  numeroSecreto: number;
  numeroIngresado: number;

  constructor(public estadisticas: EstadisticasService,public dialog: MatDialog) { }

  ngOnInit(): void
  {
    this.estadisticas.getEstadisticasJugador('piedraPapelTijera');
  }

  eleccion(elec : number)
  { 
    this.numeroSecreto = Math.round(Math.random() * 3);
    switch (elec) {
      case 1:
        this.user ="./assets/imagenes/piedra.png";
        break;
        case 2:
        this.user ="./assets/imagenes/papel.png";
        break;
        case 3:
        this.user ="./assets/imagenes/tijera.png";
        break;
    
      default:
        break;
    }
    switch (this.numeroSecreto) {
      case 1:
        this.maquina ="./assets/imagenes/piedra.png";
        break;
        case 2:
        this.maquina ="./assets/imagenes/papel.png";
        break;
        case 3:
        this.maquina ="./assets/imagenes/tijera.png";
        break;
    
      default:
        break;
    }
    this.habemus = false;
    this.visuales = true;
    this.numeroIngresado = elec;
    this.jugar();
  }

  jugar() 
  {
    switch (this.numeroSecreto) 
    {
      case 1:
          if (this.numeroIngresado == 3) {
              this.resultado = "PERDISTE";
          }
          else if (this.numeroIngresado == 2) {
              this.resultado = "GANASTE";
              this.estadisticas.jugador.ppt.puntuacion += 1;
              this.estadisticas.cargarEstadisticas('piedraPapelTijera',this.estadisticas.jugador.ppt.puntuacion);
          }
          else{
              this.resultado = "EMPATASTE";
          }
          break;
      case 2:
          if (this.numeroIngresado == 2) {
              this.resultado = "EMPATASTE";
          }
          else if (this.numeroIngresado == 1) {
              this.resultado = "PERDISTE";
          }
          else{
              this.resultado = "GANASTE";
              this.estadisticas.jugador.ppt.puntuacion += 1;
              this.estadisticas.cargarEstadisticas('piedraPapelTijera',this.estadisticas.jugador.ppt.puntuacion);
          }
          break;
      case 3:
          if (this.numeroIngresado == 2) {
              this.resultado = "PERDISTE";
          }
          else if (this.numeroIngresado == 3) {
              this.resultado = "EMPATASTE";
          }
          else{
              this.resultado = "GANASTE";
              this.estadisticas.jugador.ppt.puntuacion += 1;
              this.estadisticas.cargarEstadisticas('piedraPapelTijera',this.estadisticas.jugador.ppt.puntuacion);
          }
          break;
      default:
        this.resultado = "error";
        break;
    }
  }

  mostrarImagen()
  {
    this.habemus = true;
    this.visuales = false;
  }

}

@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class Dialogo
{
  constructor(
  public dialogRef: MatDialogRef<Dialogo>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    cerrarDialogo()
    {
      this.dialogRef.close();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
