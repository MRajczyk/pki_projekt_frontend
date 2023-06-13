import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {Data} from "../../models/data-model";

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor(private dataService: DataService, public authService: AuthService) { }

  data: Data | undefined = undefined;
  onGetPublicData() {
    this.dataService.getLoggedInData()
      .subscribe((msg) => {
        this.data = msg;
      })
  }

  ngOnInit(): void {
    this.onGetPublicData();
  }

}
