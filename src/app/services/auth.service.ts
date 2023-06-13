import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginResponseModel} from "../models/login-response-model";
import {collect} from 'collect.js';

@Injectable()
export class AuthService {
  public redirectTo: string = '/';
  private endpoint: string = '';

  private hasLoginErrors = new BehaviorSubject<boolean>(false);
  public hasLoginErrors$ = this.hasLoginErrors.asObservable();
  private hasRegisterErrors = new BehaviorSubject<boolean>(false);
  public hasRegisterErrors$ = this.hasRegisterErrors.asObservable();
  private userNotAccepted = new BehaviorSubject<boolean>(false);
  public userNotAccepted$ = this.userNotAccepted.asObservable();

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !token ? false : token !== '';
  }

  hasAdminPrivileges() {
    // @ts-ignore
    const reqUserRoles = sessionStorage.getItem('role') !== null ? JSON.parse(sessionStorage.getItem('role')) : ''
    return collect(reqUserRoles).contains('admin');
  }

  logIn(email: string, password: string) {
    const payload = new HttpParams()
      .set('email', email)
      .set('password', password);

    const returnVal: Observable<LoginResponseModel> = this.http.post<LoginResponseModel>(environment.url + this.endpoint + '/login', payload);
    returnVal.subscribe({
      next: returnVal => {
        sessionStorage.setItem('token', returnVal.accessToken);
        sessionStorage.setItem('refresh-token', returnVal.refreshToken);
        sessionStorage.setItem('role', JSON.stringify(returnVal.role));

        if(!environment.production) {
          console.log('token: ', returnVal.accessToken);
        }

        this.hasLoginErrors.next(false);
        this.router.navigate([this.redirectTo]);
      },
      error: err => {
        if(err.status === 401) {
          this.hasLoginErrors.next(true);
        }
        else if(err.status === 403) {
          this.userNotAccepted.next(true);
        }
      }
    });
  }

  refreshToken() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('refresh-token')}` });
    let options = { headers: headers };
    return this.http.post<LoginResponseModel>(environment.url + this.endpoint + '/refresh', null, options);
  }

  register(email: string, password: string, username: string) {
    const payload = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);

    const returnVal: Observable<{message: string}> = this.http.post<{message: string}>(environment.url + this.endpoint + '/register', payload);
    returnVal.subscribe({
      next: returnVal => {
        if(!environment.production) {
          console.log('Register status: ', returnVal.message);
        }
        this.hasRegisterErrors.next(false);
        this.router.navigate([this.redirectTo]);
      },
      error: err => {
        this.hasRegisterErrors.next(true);
        console.log('Register status: ', err.message);
      }
    });
  }

  logOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh-token');
    sessionStorage.removeItem('role');
  }
}
