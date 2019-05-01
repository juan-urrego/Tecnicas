import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AerolineaService } from '../aerolinea.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public aerolineaService: AerolineaService,
              public router: Router){

  }
  canActivate(){
    console.log(this.aerolineaService.estaloguedo());
    
    if(this.aerolineaService.estaloguedo()){
      console.log('Paso el guard');
      return true;

    }else{
      console.log('Bloqueado');
      // this.router.navigate(['/home']);
      return false;
      
    }
  }
}
