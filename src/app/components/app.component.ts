import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Subscription} from "rxjs";
import {EventBusService} from "../services/event-bus.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatBasicComponent} from "../ng-material/mat-basic/mat-basic.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  eventBusSub?: Subscription;

  title = 'jwt_frontend';
  constructor(public dialog: MatDialog, public authService: AuthService, private _jwtHelper: JwtHelperService, private eventBusService: EventBusService, private router: Router) {
  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.openDialog();
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  openDialog() {
    this.dialog.open(MatBasicComponent);
  }
}
