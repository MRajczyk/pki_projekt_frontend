import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

import {EventData} from "../models/event-data-model";
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {EventBusService} from "./event-bus.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('refresh')) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }});

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(this.authService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('refresh-token')}`
        }});
      return this.authService.refreshToken().pipe(
        switchMap((returnVal) => {
          localStorage.setItem('token', returnVal.accessToken);
          localStorage.setItem('refresh-token', returnVal.refreshToken);
          localStorage.setItem('role', JSON.stringify(returnVal.role));
          this.isRefreshing = false;
          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshing = false;

          if (error.status == '403') {
            this.eventBusService.emit(new EventData('logout', null));
          }

          return throwError(() => error);
        })
      );
    } else {
      this.eventBusService.emit(new EventData('logout', null));
      return next.handle(request);
    }
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
];
