import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DbService} from "../../services/db.service";
import {DbNameResponse} from "../../models/db-name-model";
import {TableNamesResponse} from "../../models/table-names-response";
import {FormControl, FormGroup} from "@angular/forms";
import {TableInfo} from "../../models/table-info-reponse-model";
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
    this.sqlQuery.setValue(localStorage.getItem('saved-query'));
  }

  tableForm: FormGroup;
  tableInfo: TableInfo | undefined;

  submit() {
    if(this.tableForm.value.table === undefined || this.tableForm.value.table === ""){
      alert('Table is not chosen!');
      return;
    }
    this.router.navigate(['/view'], { state: {
        type: 'table_name',
        data: this.tableForm.value.table
    }});
  }

  sqlQuery: FormControl;

  executeQuery(query: string) {
    if(query === undefined || query === "") {
      alert('Query field is empty!');
      return;
    }
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
