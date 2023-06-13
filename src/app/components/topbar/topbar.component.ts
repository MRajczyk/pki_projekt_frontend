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

  onLoggedInfoClick() {
    this.router.navigate(['/login-info']);
  }

  onMenuClick() {
    this.router.navigate(['/']);
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onLoggedInClick() {
    this.router.navigate(['/logged-in']);
  }

  onAdminClick() {
    this.router.navigate(['/admin']);
  }
}
