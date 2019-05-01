import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Aerolinea } from '../models/aerolinea.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AerolineaService { 
  selectedAerolinea : Aerolinea;
  aerolineas: Aerolinea[]
  readonly baseURL = 'http://localhost:3000/aerolineas';
  readonly loginURL = 'http://localhost:3000/login';
  token: string;
  aerolinea : Aerolinea;

  constructor(private http : HttpClient,
              public router :Router) { 
    this.cargarStorage();
  }

  estaloguedo(){
    console.log("token al loguearse: "+this.token);
    
    if(this.token.length>1){
      return true;
    }
    else{
      return false;
    }
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.aerolinea = JSON.parse(localStorage.getItem('aerolinea'));
    }else{
      this.token = '';
      this.aerolinea = null;
    }
  }

  logout(){
    this.aerolinea = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('aerolinea');
    localStorage.clear();

    this.router.navigate(['/login']);
    // console.log(this.token);
    
    }


  login(aerolinea: Aerolinea, recordar: boolean=false){

    if(recordar){
      localStorage.setItem('nombre',aerolinea.nombre);
    }else{
      localStorage.removeItem('nombre');
    }
      return this.http.post(this.loginURL, aerolinea ).map((res:any)=>{
        localStorage.setItem('id',res.id);
        localStorage.setItem('token',res.token);
        localStorage.setItem('aerolinea', JSON.stringify(res.token));

        return true;
      });
  }


  postAerolinea(aer : Aerolinea){
    return this.http.post(this.baseURL, aer );

  }

  getAerolinea(){
    return this.http.get(this.baseURL);
  }

  putAerolinea(aer: Aerolinea){
    return this.http.put(this.baseURL + `/${aer._id}`, aer);
  }

  deleteAerolinea(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  
}
