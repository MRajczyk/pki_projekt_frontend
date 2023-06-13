import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Subscription} from "rxjs";
import {EventBusService} from "../services/event-bus.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  eventBusSub?: Subscription;

  title = 'jwt_project';
  constructor(public authService: AuthService, private _jwtHelper: JwtHelperService, private eventBusService: EventBusService, private router: Router) {
  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
