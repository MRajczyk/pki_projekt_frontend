import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginResponseModel} from "../../models/login-response-model";

@Component({
  selector: 'app-show-login-data-component',
  templateUrl: './show-login-data.component.html',
  styleUrls: ['./show-login-data.component.css']
})
export class ShowLoginDataComponent {

  constructor(public authService: AuthService) { }

  loginData: LoginResponseModel = {
    // @ts-ignore
    accessToken: sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : '',
    // @ts-ignore
    refreshToken: sessionStorage.getItem('refresh-token') !== null ? sessionStorage.getItem('refresh-token') : '',
    // @ts-ignore
    roles: sessionStorage.getItem('roles') !== null ? JSON.parse(sessionStorage.getItem('roles')) : ''
  };
}
