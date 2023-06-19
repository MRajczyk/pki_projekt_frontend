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

  getData() {
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
  }

  ngOnInit() {
    if(this.showTableContents) {
      this.getData()
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

  clearErrorParagraph() {
    const errorParagraph = document.getElementById("error_message") as HTMLInputElement
    errorParagraph.innerHTML = '';
  }

  onGoHomeClick() {
    this.clearErrorParagraph();
    this.router.navigate(['/']);
  }

  insertRecord() {
    this.clearErrorParagraph();
  }

  editRecord() {
    this.clearErrorParagraph();
    this.dbService.sendQuery('')
  }

  removeRecord(row: []) {
    this.clearErrorParagraph();
    let columns : string = " where "
    let i = 0;
    this.tableInfo?.columns.forEach(column => {
      // @ts-ignore
      if(row[column.column_name] != "" && row[column.column_name] != null) {
        if(i !== 0) {
          columns += "and "
        }
        // @ts-ignore
        columns += column.column_name + "='" + row[column.column_name] + "' "
        ++i;
      }
    })
    console.log('DELETE FROM ' + this.passedData + columns)
    this.dbService.sendQuery('DELETE FROM ' + this.passedData + columns).subscribe({
      next: (val) => {
        console.log(val)
        this.getData()
      },
      error: (e) => {
        const errorParagraph = document.getElementById("error_message") as HTMLInputElement
        errorParagraph.innerHTML = 'Could not delete record, error: <b>' + e.error.error_message + '</b>';
        console.log(e.error.error_message)
      }
    })
  }

  sort(keyToSort: string) {
    this.clearErrorParagraph();
    this.filteredTableContents?.rows.sort((a, b) => a[keyToSort] > b[keyToSort] ? 1 : -1)
  }

  filterValues() {
    this.clearErrorParagraph();
    let allFiltersEmptyFlag : boolean = true;
    this.tableInfo?.columns.forEach(column => {
      const input = document.getElementById(column.column_name + "_filter") as HTMLInputElement
      if(input.value !== "") {
        allFiltersEmptyFlag = false;
        return;
      }
    })
    if(allFiltersEmptyFlag) {
      this.filteredTableContents = Object.assign({}, this.tableContents);
      return;
    }
    let flagFiltered: boolean = false;
    let result: [] = [];
    this.tableInfo?.columns.forEach(column => {
      const input = document.getElementById(column.column_name + "_filter") as HTMLInputElement
      if (this.filteredTableContents && this.tableContents && input.value !== "") {
        if (flagFiltered) {
          result = result.filter(row => {
            return (row[column.column_name] as string)?.toString().includes(input.value);
          }) as []
        } else {
          result = this.tableContents.rows.filter(row => {
            return (row[column.column_name] as string)?.toString().includes(input.value);
          }) as []
          flagFiltered = true;
        }
      }
    })
    this.filteredTableContents!.rows = result;
  }
}
