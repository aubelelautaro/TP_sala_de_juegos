import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service'
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  constructor(private auth: AuthService) 
  { }

  ngOnInit(): void 
  {
    this.auth.getData()
    .subscribe(data => 
      {console.log(data)}
      )
  }

}
