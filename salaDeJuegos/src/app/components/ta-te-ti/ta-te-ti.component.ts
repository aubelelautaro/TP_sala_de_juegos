import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.scss']
})
export class TaTeTiComponent implements OnInit {

  constructor(public dialog: MatDialog, public estadisticas: EstadisticasService){}

  filaA = { 1: "", 2: "", 3: "" };
  filaB = ["", "", ""];
  filaC = ["", "", ""];

  OpcionesDisponibles = [
    { nombre: "A1", disponible: true, marca: "" },
    { nombre: "A2", disponible: true, marca: "" },
    { nombre: "A3", disponible: true, marca: "" },
    { nombre: "B1", disponible: true, marca: "" },
    { nombre: "B2", disponible: true, marca: "" },
    { nombre: "B3", disponible: true, marca: "" },
    { nombre: "C1", disponible: true, marca: "" },
    { nombre: "C2", disponible: true, marca: "" },
    { nombre: "C3", disponible: true, marca: "" }
  ];


  OpcionesElegidasComputadora = [];
  OpcionesElegidasUsuario = [];

  SolucionesPosibles = [
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"]
  ];

  ngOnInit(): void {
    this.estadisticas.getEstadisticasJugador('tateti');
  }

  RegistrarOpcion(opcion) {
    if (this.OpcionesElegidasUsuario.find((element) => element == opcion) != opcion && this.OpcionesElegidasComputadora.find((element) => element == opcion) != opcion) {
      var variablesEncontradas = 0;
      var estadoPartida = 'en curso';
      var opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
        return elemento.disponible;
      });
      this.OpcionesDisponibles.forEach((e) => {
        if (e.nombre == opcion) {
          e.disponible = false;
          e.marca = "cruz";
        }
      });


      this.OpcionesElegidasUsuario.push(opcion);

      if (opcionesRestante.length <= 10)
      {
        for (let i = 0; i < this.SolucionesPosibles.length; i++) {

          this.OpcionesElegidasUsuario.forEach(posicion => {

            var resultadoBusqueda = this.SolucionesPosibles[i].find(posicionParam => {
              posicionParam == posicion;
              return posicionParam == posicion;
            })
            if (resultadoBusqueda == posicion) {
              variablesEncontradas++;
            }
          })

          if (variablesEncontradas >= 3) {
            this.OpenDialog("Hiciste 3 en línea.", "Ganaste!");
            estadoPartida = 'ganada';
            this.estadisticas.jugador.tateti.puntuacion += 1;
            this.estadisticas.cargarEstadisticas('tateti',this.estadisticas.jugador.tateti.puntuacion);
            this.reiniciarJuego();
            break;
          } else if (variablesEncontradas < 3) {
            //Reiniciar contador
            variablesEncontradas = 0;
            opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
              return elemento.disponible;
            });
            if (opcionesRestante.length == 0) {
              estadoPartida = 'empate';
            }
          }
        }
      }
      if (estadoPartida == 'en curso') {
        this.RespuestaDeLaComputadora();
      }
      else if (estadoPartida == 'empate') {
        this.OpenDialog("No pudieron hacer 3 en línea", "Empate!");
        this.reiniciarJuego();
      }
    }
  }

  reiniciarJuego() {
    this.OpcionesDisponibles = this.OpcionesDisponibles.map((element) => {
      element.marca = '';
      element.disponible = true;
      return element;
    });
    this.OpcionesElegidasUsuario = [];
    this.OpcionesElegidasComputadora = [];
  }

  RespuestaDeLaComputadora() {
    var variablesEncontradas = 0;
    var estadoPartida = "en curso";
    var opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
      return elemento.disponible;
    });

    var indiceAleatorio: number = Math.round(Math.random() * ((opcionesRestante.length - 1) - 0) + 0);
    var posicionNombre = opcionesRestante[indiceAleatorio].nombre;

    this.OpcionesDisponibles = this.OpcionesDisponibles.map((element) => {
      if (element.nombre == posicionNombre) {
        element.disponible = false;
        element.marca = "circulo";
      }
      return element;
    });

    this.OpcionesElegidasComputadora.push(posicionNombre);

    if (opcionesRestante.length <= 10)
    {
      for (let i = 0; i < this.SolucionesPosibles.length; i++) {
        this.OpcionesElegidasComputadora.forEach(posicion => {
          var resultadoBusqueda = this.SolucionesPosibles[i].find(posicionParam => {
            posicionParam == posicion;
            return posicionParam == posicion;
          })

          if (resultadoBusqueda == posicion) {
            variablesEncontradas++;
          }
        })

        if (variablesEncontradas < 3) {
          variablesEncontradas = 0;
          opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
            return elemento.disponible;
          });
          if (opcionesRestante.length == 0) {
            estadoPartida = "empate";
          }
        }
        else if (variablesEncontradas >= 3) {
          this.OpenDialog("La máquina hizo 3 en línea primero", "Perdiste!");
          this.reiniciarJuego();
          break;
        }
      }
    }

    if (estadoPartida == 'empate') {
      this.OpenDialog("No pudieron hacer 3 en línea", "Empate!");
      this.reiniciarJuego();
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