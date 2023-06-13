import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AdminComponent} from "./components/admin/admin.component";
import {LoggedInComponent} from "./components/logged-in/logged-in.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ShowLoginDataComponent} from "./components/show-login-data-component/show-login-data.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logged-in', component: LoggedInComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'dane', component: AdminComponent},
  {path: 'login-info', component: ShowLoginDataComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
