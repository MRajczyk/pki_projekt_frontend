import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { AdminComponent } from './components/admin/admin.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {UserService} from "./services/users.service";
import {DataService} from "./services/data.service";
import { ShowLoginDataComponent } from './components/show-login-data-component/show-login-data.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import {DbHealthService} from "./services/db-health.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoggedInComponent,
    AdminComponent,
    TopbarComponent,
    ShowLoginDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    NgMaterialModule
  ],
  providers: [AuthService, AuthGuardService, UserService, DataService, DbHealthService,
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
