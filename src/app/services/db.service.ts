import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DbNameResponse} from "../models/dbName-model";
import {environment} from "../../environments/environment";
import {TableNamesResponse} from "../models/table-names-response";
import {TableInfo} from "../models/tableInfo-reponse-model";
import {QueryResult} from "../models/queryReturn-model";

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

  getTableInfo(name: string): Observable<TableInfo> {
    console.log(environment.url + this.endpoint + `/table/${name}`)
    return this.http.get<TableInfo>(environment.url + this.endpoint + `/table/${name}`, {
      responseType: 'json'
    });
  }

  sendQuery(query: string): Observable<QueryResult> {
    const payload = new HttpParams()
      .set('query', query)
    return this.http.get<QueryResult>(environment.url + this.endpoint + '/query', {
      params: payload,
      responseType: 'json'
    });
  }
}
