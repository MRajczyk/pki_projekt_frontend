import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Data} from "../models/data-model";

@Injectable()
export class DataService {
  public redirectTo: string = '/';
  private endpoint: string = '/data';

  constructor(private http: HttpClient) {}

  getPublicData(): Observable<Data> {
    return this.http.get<Data>(environment.url + this.endpoint + '/public', {
      responseType: 'json'
    });
  }

  getLoggedInData(): Observable<Data> {
    return this.http.get<Data>(environment.url + this.endpoint + '/logged', {
      responseType: 'json'
    });
  }

  getAdminData(): Observable<Data> {
    return this.http.get<Data>(environment.url + this.endpoint + '/admin', {
      responseType: 'json'
    });
  }
}
