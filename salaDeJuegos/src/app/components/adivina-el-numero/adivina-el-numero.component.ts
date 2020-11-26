import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.scss']
})
export class AdivinaElNumeroComponent implements OnInit {

  constructor(public dialog: MatDialog, public estadisticas: EstadisticasService){}

  numeroIngresado;

  ngOnInit(): void {
    this.estadisticas.getEstadisticasJugador('adivinaNumero');
  }

  verificarRespuesta() {
    var numeroAleatorio: number = Math.round(Math.random() * (10 - 0) + 0);
    if (numeroAleatorio == this.numeroIngresado) {
      this.OpenDialog("Acertaste el número.", "Ganaste!");
      this.estadisticas.jugador.an.puntuacion += 1;
      this.estadisticas.cargarEstadisticas('adivinaNumero',this.estadisticas.jugador.an.puntuacion);
    }
    else {
      this.OpenDialog("La respuesta era: " + numeroAleatorio, "Perdiste!");
    }
  }

  OpenDialog(mensaje: string, titulo: string) {
    this.dialog.open(Dialogo, {
      data: {mensaje: mensaje, titulo: titulo}
    });
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