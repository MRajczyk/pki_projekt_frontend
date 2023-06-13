import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DbNameResponse} from "../models/dbName-model";
import {environment} from "../../environments/environment";
import {TableNamesResponse} from "../models/table-names-response";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private endpoint: string = '/db';

  constructor(private http: HttpClient) { }

  getDbName(): Observable<DbNameResponse> {
    return this.http.get<DbNameResponse>(environment.url + this.endpoint + '', {
      responseType: 'json'
    });
  }

  getTables(): Observable<TableNamesResponse> {
    return this.http.get<TableNamesResponse>(environment.url + this.endpoint + '/tables', {
      responseType: 'json'
    });
  }
}
