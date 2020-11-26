import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  constructor(public dialog: MatDialog, public estadisticas: EstadisticasService){}

  opcionesElegidas = { "opcion1": 0, "opcion2": 0, "cantidad": 0 };

  iconos = [
    { "nombre": "local_fire_department", "asignaciones": 0 },
    { "nombre": "local_airport", "asignaciones": 0 },
    { "nombre": "drive_eta", "asignaciones": 0 },
    { "nombre": "child_care", "asignaciones": 0 },
    { "nombre": "ac_unit", "asignaciones": 0 },
    { "nombre": "sports_soccer", "asignaciones": 0 },
    { "nombre": "sports_esports", "asignaciones": 0 },
    { "nombre": "star", "asignaciones": 0 },
    { "nombre": "adb", "asignaciones": 0 },
    { "nombre": "support", "asignaciones": 0 }
  ]

  posiciones = [
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
  ]

  ngOnInit(): void {
    this.asignarIconos();
    this.estadisticas.getEstadisticasJugador('memotest');
  }

  asignarIconos() {
    var indiceIconoAleatorio;
    var iconosValidos;
    this.posiciones.forEach(element => {
      iconosValidos = this.iconos.map((icono, index) => {
        var newObjIcon = JSON.parse(JSON.stringify(icono)); 
        newObjIcon.index = index;
        return newObjIcon;
      }).filter((icono) => {
        return icono.asignaciones < 2;
      });
      indiceIconoAleatorio = Math.round(Math.random() * ((iconosValidos.length - 1) - 0) + 0);
      element.icono = iconosValidos[indiceIconoAleatorio].nombre;
      this.iconos[iconosValidos[indiceIconoAleatorio].index].asignaciones++;
    });
  }

  ElegirOpcion(indice) {
    if (this.posiciones[indice].visible == false && this.opcionesElegidas.cantidad != 2) {
      this.posiciones[indice].visible = true;
      var icono1;
      var icono2;
      var opcionesDisponibles;
      if (this.opcionesElegidas.cantidad == 1) {
        this.opcionesElegidas.opcion2 = indice;
        icono1 = this.posiciones[this.opcionesElegidas.opcion1].icono;
        icono2 = this.posiciones[this.opcionesElegidas.opcion2].icono;
        if (icono1 == icono2) {
          this.opcionesElegidas.cantidad = 0;
          this.opcionesElegidas.opcion1 = 0;
          this.opcionesElegidas.opcion2 = 0;
        }
        else {
          setTimeout(() => {
            this.posiciones[this.opcionesElegidas.opcion1].visible = false;
            this.posiciones[this.opcionesElegidas.opcion2].visible = false;
            this.opcionesElegidas.cantidad = 0;
            this.opcionesElegidas.opcion1 = 0;
            this.opcionesElegidas.opcion2 = 0;
          }, 200);
        }

      }
      else {
        this.opcionesElegidas.opcion1 = indice;
        this.opcionesElegidas.cantidad++;
      }
      opcionesDisponibles = this.posiciones.filter((posicion) => {
        return posicion.visible != true;
      })
      if (opcionesDisponibles.length == 0) {
        this.estadisticas.jugador.memotest.puntuacion += 1;
        this.estadisticas.cargarEstadisticas('memotest',this.estadisticas.jugador.memotest.puntuacion)
        this.OpenDialog("Adivinaste todas las parejas de figuras", "Ganaste!");
        this.reiniciar();
      }
    }
  }

  reiniciar() {
    this.posiciones = this.posiciones.map((element) => {
      element.visible = false;
      element.icono = "";
      return element;
    });
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