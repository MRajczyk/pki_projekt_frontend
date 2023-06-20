import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
  onMenuClick() {
    this.router.navigate(['/']);
  }

  onRegisterClick() {
    this.authService.hasLoginErrors.next(false)
    this.router.navigate(['/register']);
  }

  onLoginClick() {
    this.authService.hasRegisterErrors.next({status: false, message: ""})
    this.router.navigate(['/login']);
  }
}
