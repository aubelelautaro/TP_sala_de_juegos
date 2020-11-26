import { Component, OnInit, Inject} from '@angular/core';
import { EstadisticasService } from 'src/app/service/estadisticas.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {

  arrayDePalabras : string[] = ["Control","Monitor","Celular","Televisión","Mouse","Teclado","Procesador","Auriculares","Gabinete","Microfono"];
  
  palabraElegida : string;
  
  palabraRta : string;

  palabraIngresada: string;
  
  bandJuego: boolean=false;
  bandVerificar : boolean=true;

  constructor(public dialog: MatDialog, public estadisticas:EstadisticasService){}

  ngOnInit(): void
  {
    this.estadisticas.getEstadisticasJugador('anagrama');
  }

  ngOnDestroy(){
    this.estadisticas.cargarEstadisticas('anagrama',this.estadisticas.jugador.anagrama.puntuacion);
  }

  generarPalabra() 
  {
    var numero : number = Math.round(Math.random() * (9-1) + 1);
    console.info('Palabra desordenada: ' + this.arrayDePalabras[numero]);
    var palabraRandom : string = this.arrayDePalabras[numero];
    
    var palabraArray = palabraRandom.trim().split('');

    var palabraDesordenada: string = "";

    for(var i = 0; i<3; i++)
    {

      let indiceOrigen = Math.round(Math.random() * ((palabraRandom.length-1) - 0) + 0);
      let indiceDestino = Math.round(Math.random() * ((palabraRandom.length-1) - 0) + 0);
      let letraOrigen = palabraArray[indiceOrigen];
      let letraDestino = palabraArray[indiceDestino];
      palabraArray[indiceOrigen] = letraDestino;
      palabraArray[indiceDestino] = letraOrigen;
    }

    palabraArray.forEach(letra =>{
      palabraDesordenada += letra;
    });

    this.bandJuego=true;
    this.bandVerificar=false;

    this.palabraRta = palabraRandom;
    this.palabraElegida = palabraDesordenada

  }

  verificarPalabra()
  {
      if(this.palabraRta == this.palabraIngresada)
      {
        this.mensaje("Palabra adivinada","Ganaste!");
        this.estadisticas.jugador.anagrama.puntuacion++;
        this.generarPalabra();
      }
      else
      {
        this.mensaje("Segui participando","No es la palabra");
      }
  }

  mensaje(mensaje:string,titulo:string)
  {
    let dialogRef = this.dialog.open(Dialogo, {
      data: {mensaje:mensaje, titulo:titulo}
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