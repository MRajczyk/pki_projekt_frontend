import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {OAuthService} from "../../services/o-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serv:OAuthService, private authService: AuthService, private router:Router) { }

  AuthUrl: string | undefined;

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

    this.serv.GetAuthPage().subscribe(
        data => {
        // @ts-ignore
          this.AuthUrl = data["authUrl"]
        },
        err => {
        console.log(err)
      });
    }

  onSubmit(): void {
    this.authService.logIn(this.email, "", this.password);
  }

  githubLogin() {
    console.log("navigation", this.AuthUrl)
    this.router.navigate(['/test'],{queryParams:{url:this.AuthUrl}});
  }

}
