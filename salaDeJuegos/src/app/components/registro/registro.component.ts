import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/clases/jugador';
import { AuthService } from 'src/app/service/auth.service';
import { EstadisticasService } from 'src/app/service/estadisticas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  correo = "";
  clave = "";
  form;
  
  constructor(
    private auth:AuthService,
    private router:Router,
    private estadisticas : EstadisticasService,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({      
      clave: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')
      ])),
    });
  }

  registrarse()
  {
    try
    {
      this.auth.CrearUsuario(this.correo,this.clave).then((data)=>{
        if(data != undefined)
        {
          var jugador = new Jugador();
          jugador.correo = this.correo;
          jugador.clave = this.clave;

          this.estadisticas.crearEstadisticas();
          this.router.navigateByUrl('/acercaDe');
        }
        else{

        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
