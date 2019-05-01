import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Avion } from '../models/avion.model';

@Injectable({
  providedIn: 'root'
})
export class AvionService { 
  selectedAvion : Avion;
  aviones: Avion[]
  readonly baseURL = 'http://localhost:3000/aviones';

  constructor(private http : HttpClient) { }

  postAvion(avi : Avion){
    return this.http.post(this.baseURL, avi );

  }

  getAvion(){
    return this.http.get(this.baseURL);
  }

  putAvion(avi: Avion){
    return this.http.put(this.baseURL + `/${avi._id}`, avi);
  }

  deleteAvion(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
