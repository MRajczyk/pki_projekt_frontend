import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DbNameResponse} from "../models/db-name-model";
import {environment} from "../../environments/environment";
import {TableNamesResponse} from "../models/table-names-response";
import {TableInfo} from "../models/table-info-reponse-model";
import {QueryResult} from "../models/query-return-model";
import {TableSelect} from "../models/table-select-response-model";

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

  getTable(name: string): Observable<TableSelect> {
    return this.http.get<TableSelect>(environment.url + this.endpoint + `/table/${name}`, {
      responseType: 'json'
    });
  }

  getTableInfo(name: string): Observable<TableInfo> {
    return this.http.get<TableInfo>(environment.url + this.endpoint + `/table_info/${name}`, {
      responseType: 'json'
    });
  }

  sendQuery(query: string): Observable<QueryResult> {
    const payload = new HttpParams()
      .set('query', query)
      .set('responseType', 'json')
    return this.http.post<QueryResult>(environment.url + this.endpoint + '/query', payload);
  }
}
