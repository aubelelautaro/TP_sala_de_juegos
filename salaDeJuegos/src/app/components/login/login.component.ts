import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from  '../../service/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo = "aubelelautaro@gmail.com";
  clave = "111111";
  form;
  
  constructor(
    private auth:AuthService,
    private router:Router,
    private fb:FormBuilder,
    public dialog: MatDialog
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

    this.auth.UsuarioLogeado().then(user=>{
      
      if(user != null &&  user.uid ==  localStorage.getItem("usuarioLogeado"))
      {
        this.router.navigateByUrl('/acercaDe');
      }
      else
      {
        //this.OpenDialog("ERROR", 'No se encontró al usuario');
      }
    })
  }

  verificar()
  {
    try
    {
      this.auth.Login(this.correo,this.clave).then((user)=>{
        if(user)
        {
          localStorage.setItem("usuarioLogeado",user.user.uid);
          this.router.navigateByUrl('/acercaDe');
        }
        else
        {
          this.OpenDialog("ERROR", "Hubo un problema al iniciar sesión.");
        }
      })
    }
    catch(e)
    {
      this.OpenDialog("ERROR", "Hubo un problema al iniciar sesión.");
    }
  }

  OpenDialog(titulo: string, mensaje: string) {
    this.dialog.open(DialogAlert, {
      data: {titulo: titulo, mensaje: mensaje}
    });
  }
}

@Component({
  templateUrl: 'dialogAlert.html',
  selector: "dialogAlert"
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  CloseDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
