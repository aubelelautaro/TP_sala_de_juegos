import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private loc : Location,
    private auth : AuthService,
    private router : Router)
  {}
  botones = {
    atras:true,
    home:true,
    opciones:true
  };

  ngOnInit(): void {
    this.router.events.subscribe((events:any)=>{
      if(events.url == "/login" && events.url != undefined)
      {
        this.botones.atras = false;
        this.botones.home = false;
        this.botones.opciones = false;
      }
      else if(events.url == "/registro"){

        this.botones.atras = true;
        this.botones.home = false;
        this.botones.opciones = false;
      }
      else if(events.url == "/juegos")
      {
        this.botones.atras = true;
        this.botones.home = false;
        this.botones.opciones = true;
      }
      else if(events.url == "/acercaDe" && events.url != undefined)
      {
        this.botones.atras = false;
        this.botones.home = false;
        this.botones.opciones = true;
      }
      else if(events.url != undefined)
      {
        this.botones.atras = true;
        this.botones.home = false;
        this.botones.opciones = true;
      }
    });


  }

  LogOut(){
    this.auth.LogOut().then(()=>{
      this.router.navigateByUrl("/login");
    })
  }

  atras() {
    this.loc.back();
  }

}
