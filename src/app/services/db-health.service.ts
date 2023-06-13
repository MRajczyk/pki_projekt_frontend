import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DbHealth} from "../models/db-status-model";

@Injectable()
export class DbHealthService {
  public redirectTo: string = '/';
  private endpoint: string = '/database';

  constructor(private http: HttpClient) {}

  getDatabaseStatus(): Observable<DbHealth> {
    return this.http.get<DbHealth>(environment.url + this.endpoint, {
      responseType: 'json'
    });
  }
}
