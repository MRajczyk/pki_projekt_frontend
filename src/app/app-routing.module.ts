import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ViewPageComponent} from "./components/view-page/view-page.component";
import {EditAddRecordComponent} from "./components/edit-add-record/edit-add-record.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view', component: ViewPageComponent},
  {path: 'editor', component: EditAddRecordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
