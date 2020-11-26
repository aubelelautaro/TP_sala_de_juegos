import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.scss']
})
export class AgilidadAritmeticaComponent implements OnInit {

  constructor(public dialog: MatDialog, public estadisticas: EstadisticasService){}

  operadores = [
    '+',
    '-',
    '/',
    '*'
  ];

  respuesta;
  operacionStr = "";
  numeroIngresado;
  bandJuego: boolean=false;
  bandVerificar : boolean=true;

  ngOnInit(): void {
    this.estadisticas.getEstadisticasJugador('agilidadAritmetica');
  }

  generarCuenta() {
    var op1: number = Math.round(Math.random() * (100 - 0) + 0);
    var op2: number = Math.round(Math.random() * (100 - 0) + 0);
    var operador = this.operadores[Math.round(Math.random() * (3 - 0) + 0)];
    this.bandJuego=true;
    this.bandVerificar=false;
    this.calcular(op1, op2, operador);
    this.operacionStr = op1.toString() + " " + operador + " " + op2.toString();
  }

  calcular(op1, op2, operador) {
    switch (operador) {
      case '+':
        this.respuesta = parseFloat((op1 + op2).toFixed(2));
        break;
      case '-':
        this.respuesta = parseFloat((op1 - op2).toFixed(2));
        break;
      case '*':
        this.respuesta = parseFloat((op1 * op2).toFixed(2));
        break;
      case '/':
        this.respuesta = parseFloat((op1 / op2).toFixed(2));
        break;
    }
  }

  verificarRespuesta() {
    if (this.numeroIngresado == this.respuesta) {
      this.OpenDialog("Respuesta correcta", "Ganaste!");
      this.estadisticas.jugador.aa.puntuacion += 1;
      this.estadisticas.cargarEstadisticas('agilidadAritmetica',this.estadisticas.jugador.aa.puntuacion);
    }
    else {
      this.OpenDialog("La respuesta es: " + this.respuesta, "Perdiste!");
    }
  }

  OpenDialog(mensaje: string, titulo: string) {
    this.dialog.open(Dialogo, {
      data: { mensaje: mensaje, titulo: titulo }
    }).afterClosed().subscribe(() => {
      this.generarCuenta();
    })
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