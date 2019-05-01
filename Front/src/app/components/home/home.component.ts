import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.model();
  }

  public model(){
    
    $(document).ready(function(){
      $('.modal').modal();
    });
            

    }




}
