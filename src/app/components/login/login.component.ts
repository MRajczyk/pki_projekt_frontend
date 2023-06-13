import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public email: string = '';
  public password: string = '';
  public loginFailed!: boolean;
  public notAcceptedUser!: boolean;

  ngOnInit(): void {
    this.authService.hasLoginErrors$.subscribe({
      next: (value) => {
        this.loginFailed = value;
      },
    });

    this.authService.userNotAccepted$.subscribe({
      next: (value) => {
        this.notAcceptedUser = value;
      },
    });
  }

  onSubmit(): void {
    this.authService.logIn(this.email, this.password);
  }

}
