import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  constructor(private http:HttpClient) { }
  GetAuthPage():Observable<string>{
    return this.http.get<string>(environment.url+'/oauth/AuthPage');
  }

  getAcessToken(auth_code: string | null) {
    return this.http.post(environment.url+'/oauth/getAccessToken',{code:auth_code}, {responseType: 'json'});
  }
}
