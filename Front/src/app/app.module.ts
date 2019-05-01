import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app.routes';


import { AppComponent } from './app.component';

//Componentes
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminaeroComponent } from './components/adminaero/adminaero.component';
import { TicketComponent } from './components/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AdminaeroComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTES
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
