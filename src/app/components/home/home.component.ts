import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DbService} from "../../services/db.service";
import {DbNameResponse} from "../../models/dbName-model";
import {TableNamesResponse} from "../../models/table-names-response";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TableInfo} from "../../models/tableInfo-reponse-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  constructor(public authService: AuthService, public dbService: DbService) {
    this.tableForm = new FormGroup({
      table: new FormControl(''),
    });

    this.sqlQuery = new FormControl('');
  }
  tableForm: FormGroup;

  tableInfo: TableInfo | undefined;
  submit() {
    console.log(this.tableForm.value.table);

    this.dbService.getTableInfo(this.tableForm.value.table).toPromise().then((value) => {
      console.log(value);
    })
  }

  sqlQuery: FormControl;
  executeQuery() {
    console.log(this.sqlQuery.value)
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
