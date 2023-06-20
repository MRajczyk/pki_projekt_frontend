import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OAuthService} from "../../services/o-auth.service";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-redirect-component',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})

export class RedirectComponent implements OnInit {
  constructor(private active:ActivatedRoute, private serv:OAuthService, private router:Router, private authService: AuthService) { }
  ngOnInit() {
    console.log(this.active.snapshot.queryParamMap.get('code'))
    this.serv.getAcessToken(this.active.snapshot.queryParamMap.get('code')).subscribe({
      next: (data) => {
        console.log(data)
        // @ts-ignore
        this.authService.logIn(data.data.email, data.data.login, 'oauth');
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/'])
      }
    })
  }
}
