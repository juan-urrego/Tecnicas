import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AerolineaService } from 'src/app/services/aerolinea.service';
import { Aerolinea } from 'src/app/models/aerolinea.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  nombre:string;
  recuerdame :boolean = false;
  constructor(
    public aerolineaService: AerolineaService,
    public router: Router
  ) { }

  ngOnInit() {
    
    this.nombre = localStorage.getItem('nombre') || '';
    if(this.nombre.length >1){
      this.recuerdame = true;
    }
  }

  ingresar( forma : NgForm){

    // if(forma.valid){
    //   return;
    // }

    let aerolinea = new Aerolinea();
    aerolinea.nombre= forma.value.nombre;
    aerolinea.password = forma.value.password;
    console.log("es valido: "+forma.valid);
    console.log("el valor es : "+forma.value);

    this.aerolineaService.login(aerolinea, forma.value.recuerdame).subscribe( correcto => this.router.navigate(['/admin']));

    
    
  }

}
