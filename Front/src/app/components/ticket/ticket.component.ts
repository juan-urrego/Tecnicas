import { Component, OnInit } from '@angular/core';

declare var M : any;
declare var $ : any;
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.select();
    this.date();
  }
  
  public select(){
    $(document).ready(function(){
      $('select').formSelect();
    });
        
  }

  public date(){
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });
            
  }

}