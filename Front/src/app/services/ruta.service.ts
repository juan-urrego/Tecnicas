import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Ruta } from '../models/ruta.model';

@Injectable({
  providedIn: 'root'
})
export class RutaService { 
  selectedRuta : Ruta;
  rutas: Ruta[]
  readonly baseURL = 'http://localhost:3000/rutas';

  constructor(private http : HttpClient) { }

  postRuta(rut : Ruta){
    return this.http.post(this.baseURL, rut );

  }

  getRuta(_id ?: string){
    if(!_id){
      return this.http.get(this.baseURL);
    }else{
      return this.http.get(this.baseURL + `/${_id}`);
    }
  }

  putRuta(rut: Ruta){
    return this.http.put(this.baseURL + `/${rut._id}`, rut);
  }

  deleteRuta(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
