import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public email: string = '';
  public password: string = '';
  public name: string = '';
  public registerFailed!: boolean;
  public registerFailMessage!: string;

  ngOnInit(): void {
    this.authService.hasRegisterErrors$.subscribe({
      next: (value) => {
        this.registerFailed = value.status;
        this.registerFailMessage = value.message;
      },
    });
  }

  onSubmit(): void {
    this.authService.register(this.email, this.password, this.name);
  }
}
