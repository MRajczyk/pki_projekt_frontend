import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {QueryResult} from "../../models/query-return-model";
import {TableInfo} from "../../models/table-info-reponse-model";
import {TableSelect} from "../../models/table-select-response-model";
import {DbService} from "../../services/db.service";
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {

  public showTableContents: boolean = false;
  public showQueryResult: boolean = false;

  public tableInfo: TableInfo | undefined;
  public tableContents: TableSelect | undefined;
  public filteredTableContents: TableSelect | undefined;
  public queryResult: QueryResult | undefined;
  public queryError: string | undefined;

  public customQuerySuccessful: boolean = true;
  public passedData: string;

  constructor(public authService: AuthService, private router: Router, private dbService: DbService, @Inject(DOCUMENT) document: Document) {
    this.passedData = this.router.getCurrentNavigation()?.extras.state?.['data'];

    if(this.router.getCurrentNavigation()?.extras.state?.['type'] === 'table_name') {
      this.showTableContents = true;
    } else {
      this.showQueryResult = true;
    }
  }

  ngOnInit() {
    if(this.showTableContents) {
      this.dbService.getTableInfo(this.passedData).subscribe({
        next: (value) => {
          this.tableInfo = value;
          this.dbService.getTable(this.passedData).subscribe({
            next: (value) => {
              this.tableContents = value;
              this.filteredTableContents = Object.assign({}, this.tableContents);
            },
            error: (err) => {
              console.log(err)
            }
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.dbService.sendQuery(this.passedData).subscribe({
        next: (value) => {
          this.queryResult = value;
          this.customQuerySuccessful = true;
        },
        error: (err) => {
          this.queryError = err.error.error_message
          this.customQuerySuccessful = false;
        }
      })
    }
  }

  onGoHomeClick() {
    this.router.navigate(['/']);
  }

  addRecord() {

  }

  editRecord() {

  }

  sort(keyToSort: string) {
    this.tableContents?.rows.sort((a, b) => a[keyToSort] > b[keyToSort] ? 1 : -1)
  }

  filterValues(value: string, columnToFilterName: string) {
    if(value === "" || !value) {
      this.filteredTableContents = Object.assign({}, this.tableContents);
      return;
    }
    this.tableInfo?.columns.forEach(column => {
      if(column.column_name !== columnToFilterName) {
        const input = document.getElementById(column.column_name + "_filter") as HTMLInputElement
        input.value = "";
      }
    })
    if(this.filteredTableContents && this.tableContents) {
      const result: [] = [];
      this.tableContents.rows.forEach(row => {
        if(row[columnToFilterName] == value) {
          result.push(row)
        }
      })
      this.filteredTableContents.rows = result;
    }
    //todo: czeba jednak sklonowac pewnie bo nie zmodyfikuje sie + sprawdzic po czym w ogole filtruje xd
  }

  deleteRecord() {

  }
}
