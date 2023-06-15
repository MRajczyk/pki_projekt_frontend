import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {

  constructor(public authService: AuthService, private router: Router) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  // submit() {
  //   console.log(this.tableForm.value.table);
  //
  //   this.dbService.getTableInfo(this.tableForm.value.table).toPromise().then((value) => {
  //     this.router.navigate(['action-selection'], { state: { tableName: this.tableForm.value.table } });
  //     console.log(value);
  //   })
  // }
  //
  // executeQuery(query: string) {
  //   this.dbService.sendQuery(query).toPromise().then((value) => {
  //     this.router.navigate(['action-selection'], { state: { query: query } });
  //     console.log(value);
  //   })
  // }
}
