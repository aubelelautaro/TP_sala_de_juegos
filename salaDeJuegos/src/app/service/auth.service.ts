import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpService) 
  { }

  getData(url = "https://pokeapi.co/api/v2/pokemon/")
  {
    return this.http.get(url);

  }

}
