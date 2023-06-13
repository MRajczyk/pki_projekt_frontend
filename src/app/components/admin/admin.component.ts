import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/users.service";
import {User} from "../../models/user-model";
import {AuthService} from "../../services/auth.service";
import {Data} from "../../models/data-model";
import {DataService} from "../../services/data.service";
import {interval, startWith, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  readonly USERS_POOLING_TIME_INTERVAL = 1000;
  timeInterval!: Subscription;

  constructor(private dataService: DataService, private userService: UserService, public authService: AuthService) { }

  data: Data | undefined = undefined;
  onGetPublicData() {
    this.dataService.getAdminData()
      .subscribe((msg) => {
        this.data = msg;
      })
  }

  users: User[] = [];
  onGetUsers() {
    this.userService.getUsers().subscribe({
      next: list => {
        this.users = list.users;
        console.log(this.users)
      },
      error: err => {
        if(err.status === 401 && err.statusText === 'Unauthorized') {

        }
      }
    })
  }

  onVerifyUser(userId: string) {
    this.userService.verifyUser(userId).subscribe({
        next: userId => {
          console.log(userId)
        },
        error: err => {
          console.log(err.status);
        }
      }
    )
  }

  ngOnInit(): void {
    this.onGetPublicData();

    this.timeInterval = interval(this.USERS_POOLING_TIME_INTERVAL)
      .pipe(
        startWith(0),
        switchMap(() => this.userService.getUsers())
      ).subscribe({
        next: list => {
          this.users = list.users;
        },
        error: err => {
          if(err.status === 401 && err.statusText === 'Unauthorized') {

          }
        }
      })
  }
}
