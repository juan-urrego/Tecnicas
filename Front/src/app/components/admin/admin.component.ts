import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AerolineaService } from '../../services/aerolinea.service';
import { Aerolinea } from '../../models/aerolinea.model';

import { RutaService } from '../../services/ruta.service';
import { Ruta } from '../../models/ruta.model';


declare var M: any; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AerolineaService, RutaService]
})
export class AdminComponent implements OnInit {

  constructor(private aerolineaService: AerolineaService,
              private rutaService: RutaService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshAerolineaList();
    this.resetFormRuta();
    this.refreshRutaList();
  }

  onLogout(){
    this.aerolineaService.logout();
  }

  resetForm(form ?: NgForm){
  
    this.aerolineaService.selectedAerolinea={
      _id : "",
      nombre: "",
      id : null,
      password : "",
      role: "AERO_ROLE",
      rutas:"",
      aviones: ""
    }
  }

  onSubmit(form : NgForm){
    if(form.value._id == ""){
      this.aerolineaService.postAerolinea(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshAerolineaList();
        M.toast({ html: 'Registrado', classes: 'rounded'});
      });
    }
    else{
      this.aerolineaService.putAerolinea(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshAerolineaList();
        M.toast({ html: 'Actualizado', classes: 'rounded'});
      });
    }
  }

  refreshAerolineaList(){
    this.aerolineaService.getAerolinea().subscribe((res)=>{
      this.aerolineaService.aerolineas = res as Aerolinea[];
    });
  }

  onEdit(aer: Aerolinea){
    this.aerolineaService.selectedAerolinea = aer;
  }

  onDelete(_id: string, form : NgForm){
    if(confirm('Estas seguro de eliminar esta aerolinea ?')==true){
      this.aerolineaService.deleteAerolinea(_id).subscribe((res)=>{
        this.refreshAerolineaList();
        this.resetForm(form);
        M.toast({ html:'Eliminado', classes: 'rounded'});
      });
    }
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

}