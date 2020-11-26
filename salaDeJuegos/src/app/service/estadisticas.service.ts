import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Jugador } from '../clases/jugador';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor( private firestore:AngularFirestore, private auth:AuthService)
  {this.jugador = new Jugador();}

  jugador :Jugador;

  getEstadisticas(tipoJuego:string)
  {
    return this.firestore.collection('estadisticas/'+tipoJuego+'/registros', 
      ref => ref.orderBy('puntuacion','desc').limit(5)
    )
    .valueChanges();
  }

  getEstadisticasJugador(tipoJuego:String)
  {
    this.auth.UsuarioLogeado().then((user)=>{
      if(user != undefined)
      {
        var query = this.firestore.collection('estadisticas/'+tipoJuego+'/registros').doc(user.email)
        .valueChanges()
        .subscribe((data)=>{
          switch(tipoJuego)
          {
            case 'anagrama':
              this.jugador.anagrama = data;
            break;
            case 'piedraPapelTijera':
              this.jugador.ppt = data;
            break;
            case 'agilidadAritmetica':
              this.jugador.aa = data;
            break;
            case 'adivinaNumero':
              this.jugador.an = data;
            break;
            case 'memotest':
              this.jugador.memotest = data;
            break;
            case 'tateti':
              this.jugador.tateti = data;
            break;
            case 'juegoAlumno':
              this.jugador.ja = data;
            break;
          }
          query.unsubscribe();
        });
      }
      else
      {
      }
    })
  }

  cargarEstadisticas(tipoJuego:string,puntuacion:any)
  {
    try {
      this.auth.UsuarioLogeado().then((user)=>{
        console.log(user);
        if(user != undefined)
        {
          this.firestore.collection('estadisticas/'+tipoJuego+'/registros').doc(user.email).set({
            puntuacion:puntuacion,
            jugador:user.email,
            fecha: Date.now()
          })
        }
        else
        {
        }
      })
    } catch (error) {
    }
  }

  crearEstadisticas()
  {
    try {
      this.auth.UsuarioLogeado().then((user)=>{
        console.log(user);
        if(user != undefined)
        {
          this.firestore.collection('estadisticas/anagrama/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/agilidadAritmetica/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/adivinaNumero/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/memotest/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/piedraPapelTijera/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/tateti/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/juegoAlumno/registros').doc(user.email).set({
            puntuacion:0,
            jugador:user.email,
            fecha: ""
          })
        }
        else
        {
        }
      })
    } catch (error) {
    }
  }
}
