import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar Componentes
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminaeroComponent } from './components/adminaero/adminaero.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const appRoutes: Routes = [

        { path: 'login', component: LoginComponent },
        { path: 'home', component: HomeComponent },
        { path: 'employee', component: EmployeeComponent },
        { path: 'ticket', component: TicketComponent },
        { path: 'admin', component: AdminComponent, canActivate: [LoginGuardGuard]},
        { path: 'adminaero', component: AdminaeroComponent , canActivate: [LoginGuardGuard]},
        { path: '**', component: HomeComponent }

]


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });