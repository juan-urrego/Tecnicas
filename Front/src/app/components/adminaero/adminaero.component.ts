import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RutaService } from '../../services/ruta.service';
import { Ruta } from '../../models/ruta.model';

import { AvionService } from '../../services/avion.service';
import { Avion } from '../../models/avion.model';

declare var M:any;
declare var $:any;

@Component({
  selector: 'app-adminaero',
  templateUrl: './adminaero.component.html',
  styleUrls: ['./adminaero.component.css'],
  providers : [RutaService,AvionService]
})
export class AdminaeroComponent implements OnInit {

  public nombre: string;
  public ruta: string;
  public piloto : string;
   rutinfo: Ruta[]=[];
  constructor(private rutaService: RutaService, private avionService: AvionService) { }
  
  
  ngOnInit() {
    this.resetFormRuta();
    this.refreshRutaList();
    this.prueba();
    this.resetFormAvion();
    this.refreshAvionList();
  }


  // Aviones
  resetFormAvion(form ?: NgForm){
    this.avionService.selectedAvion ={
        _id: "",
        numero:"",
        piloto: "",
        role: "ACTIVE_ROLE",
        pasajeros : "",
        ruta : ""
    }
  }

  onSubmitAvion(form : NgForm){
    if(form.value._id ==""){
      console.log(form.value);
      
      this.avionService.postAvion(form.value).subscribe((res)=>{
        this.resetFormAvion(form);
        this.refreshAvionList();
        M.toast({ html: 'Regitrado', classes: 'rounded'});
      });
    }
    else{
      this.avionService.putAvion(form.value).subscribe((res)=>{
        this.resetFormAvion(form);
        this.refreshAvionList();
        M.toast({ html: 'Actualizado', classes: 'rounded'});
      })
    }
  }

  refreshAvionList(){
    this.avionService.getAvion().subscribe((res)=>{
      this.avionService.aviones = res as Avion[];
    });
  }


  onEditAvion(avi: Avion){
    this.avionService.selectedAvion = avi;
  }

  onDeleteAvion(_id:string, form: NgForm){
    if(confirm('Estas seguro de eliminar esta aerolinea ?')==true){
      this.avionService.deleteAvion(_id).subscribe((res)=>{
        this.refreshAvionList();
        this.resetFormAvion(form);
        M.toast({ html:'Eliminado', classes: 'rounded'});
      });
    }
  }

  // Fin Aviones


onInfo(avi: Avion){
  
  this.nombre = avi.numero;
  this.ruta = avi.ruta;
  // this.rutinfo = avi.ruta
  // this.rutinfo._id = avi.ruta;
  this.piloto = avi.piloto;
  // this.rutaService.getRuta(this.ruta).subscribe( rutas => this.rutinfo= rutas);
  // console.log(avi.ruta);
}






  // Rutas
  resetFormRuta(form ?: NgForm){
    this.rutaService.selectedRuta={
      _id    : "",
      ciudad : ""
    }
  }

  onSubmitRuta(form: NgForm){
    if(form.value._id == ""){
      this.rutaService.postRuta(form.value).subscribe((res)=>{
        this.resetFormRuta(form);
        this.refreshRutaList();
        M.toast({ html: 'Registrado', classes: 'rounded'});
      })
    }
    else{
      this.rutaService.putRuta(form.value).subscribe((res)=>{
        this.resetFormRuta(form);
        this.refreshRutaList();
        M.toast({ html: 'Actualizado', classes: 'rounded'});
      });
    }
  }
  
  refreshRutaList(){
    this.rutaService.getRuta().subscribe((res)=>{
      this.rutaService.rutas = res as Ruta[];
    });
  }

  onEditRuta(rut: Ruta){
    this.rutaService.selectedRuta= rut;
  }

  onDeleteRuta(_id:string, form : NgForm){
    if(confirm('Estas seguro de eliminar esta ruta ?')==true){
      this.rutaService.deleteRuta(_id).subscribe((res)=>{
        this.refreshRutaList();
        this.resetFormRuta(form);
        M.toast({ html:'Eliminado', classes: 'rounded'});
      });
    }
  }


  // Fin Rutas


  // Para seleccionar las rutas en el registro de Avion
  public prueba(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }
}
