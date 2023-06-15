import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DbService} from "../../services/db.service";
import {DbNameResponse} from "../../models/dbName-model";
import {TableNamesResponse} from "../../models/table-names-response";
import {FormControl, FormGroup} from "@angular/forms";
import {TableInfo} from "../../models/tableInfo-reponse-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public dbService: DbService, private router: Router) {
    this.tableForm = new FormGroup({
      table: new FormControl(''),
    });

    this.sqlQuery = new FormControl('');
  }

  tableForm: FormGroup;

  tableInfo: TableInfo | undefined;

  submit() {
    this.router.navigate(['/view'], { state: {
        type: 'query',
        data: this.tableForm.value.table
      } });
  }

  sqlQuery: FormControl;

  executeQuery(query: string) {
    this.router.navigate(['/view'], {
      state: {
        type: 'query',
        data: query
      } });
  }

  public dbName: DbNameResponse | undefined;

  getDbInfo() {
    this.dbService.getDbName().subscribe((msg) => {
      this.dbName = msg;
    })
  }

  public dbTables: TableNamesResponse | undefined;

  getDbTables() {
    this.dbService.getTables().subscribe((msg) => {
      this.dbTables = msg;
    })
  }

  ngOnInit() {
    this.getDbInfo();
    this.getDbTables();
  }
}
