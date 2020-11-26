import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-juego-alumno',
  templateUrl: './juego-alumno.component.html',
  styleUrls: ['./juego-alumno.component.scss']
})
export class JuegoAlumnoComponent implements OnInit {

  arrayDePalabras : string[] = ["Independiente","Racing","Boca","River","Estudiantes","Gimnasia","Quilmes","Newells","Arsenal","Colon"];
  
  palabraElegida : string;
  
  palabraRta : string;

  palabraIngresada: string;
  
  bandJuego: boolean=false;
  bandVerificar : boolean=true;

  constructor(public dialog: MatDialog,
    private estadisticas:EstadisticasService,
  ) 
  {}

  ngOnInit(): void {
    this.estadisticas.getEstadisticasJugador('juegoAlumno');
  }

  ngOnDestroy(){
    this.estadisticas.cargarEstadisticas('juegoAlumno',this.estadisticas.jugador.ja.puntuacion);
  }

  generarPalabra() 
  {
    var numero : number = Math.round(Math.random() * (9-1) + 1);
    var palabraRandom : string = this.arrayDePalabras[numero];


    this.bandJuego=true;
    this.bandVerificar=false;

    this.palabraRta = palabraRandom;
    var palabraConAsteriscos: string = palabraRandom.replace(/[aeiou]/g, '*');

    this.palabraElegida = palabraConAsteriscos;

  }

  verificarPalabra()
  {
      if(this.palabraRta == this.palabraIngresada)
      {
        this.OpenDialog("Palabra adivinada","Ganaste!");
        this.estadisticas.jugador.ja.puntuacion++;
        this.generarPalabra();
      }
      else
      {
        this.OpenDialog("Segui participando","No es la palabra");
      }
  }

  OpenDialog(mensaje: string, titulo: string) {
    this.dialog.open(Dialogo, {
      data: { mensaje: mensaje, titulo: titulo }
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