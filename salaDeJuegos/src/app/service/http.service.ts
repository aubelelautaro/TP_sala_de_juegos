import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  get(url)
  {
    return this.httpClient.get(url);
  }

  post(url, body)
  {
    return this.httpClient.post(url, {body});
  }

  put(url, body)
  {
    return this.httpClient.put(url, {body});
  }

  delete(url)
  {
    return this.httpClient.delete(url);
  }

}
