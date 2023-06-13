import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Users} from "../models/users-model";

@Injectable()
export class UserService {
  public redirectTo: string = '/';
  private endpoint: string = '/users';

  private hasAuthErrors = new BehaviorSubject<boolean>(false);
  public hasAuthErrors$ = this.hasAuthErrors.asObservable();

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router, private authService: AuthService) {}

  getUsers(): Observable<Users> {
    return this.http.get<Users>(environment.url + this.endpoint, {
      responseType: 'json'
    });
  }

  verifyUser(userId: string) {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.http.post<string>(environment.url + '/verifyUser', {}, {params});
  }
}
