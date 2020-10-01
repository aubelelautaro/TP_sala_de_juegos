import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void
  {
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
