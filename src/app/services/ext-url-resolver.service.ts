import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ExtUrlResolverService implements Resolve<any> {
  constructor() { }
  resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any> {
    console.log('fired!')
    //dodana assercja jakas, idk
    window.location.href=<string>route.queryParamMap.get('url');
    return of(null);
  }}
