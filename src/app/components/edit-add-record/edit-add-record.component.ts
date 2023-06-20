import {Component, Inject} from '@angular/core';
import {TableInfo} from "../../models/table-info-reponse-model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DbService} from "../../services/db.service";
import {DOCUMENT} from "@angular/common";

type objType = {
  [key: string]: string
}

@Component({
  selector: 'app-edit-add-record',
  templateUrl: './edit-add-record.component.html',
  styleUrls: ['./edit-add-record.component.css']
})
export class EditAddRecordComponent {

  public tableInfo: TableInfo | undefined;
  public record: objType;
  public passedData: string;
  public mode: string;

  constructor(public authService: AuthService, private router: Router, private dbService: DbService, @Inject(DOCUMENT) document: Document) {
    this.passedData = this.router.getCurrentNavigation()?.extras.state?.['data']
    this.mode = this.router.getCurrentNavigation()?.extras.state?.['mode']
    this.tableInfo = this.router.getCurrentNavigation()?.extras.state?.['tableInfo']
    this.record = this.router.getCurrentNavigation()?.extras.state?.['record'] ? this.router.getCurrentNavigation()?.extras.state?.['record'] : []
  }

  clearResultInfoParagraph() {
    const resultParagraph = document.getElementById("result_message") as HTMLInputElement
    resultParagraph.innerHTML = '';
  }

  onGoBackToViewPageClick() {
    this.clearResultInfoParagraph();
    this.router.navigate(['/view'], { state: {
        type: 'table_name',
        data: this.passedData
    }});
  }

  applyChanges() {
    this.clearResultInfoParagraph();
    console.log(this.tableInfo)
    let setString : string = " set "
    let i = 0;
    this.tableInfo?.columns.forEach(column => {
      let column_input = document.getElementById(`input_${column.column_name}`) as HTMLInputElement
      if(this.record[column.column_name] != "" && this.record[column.column_name] != null) {
        if(i !== 0) {
          setString += ", "
        }
        setString += column.column_name + "='" + column_input.value + "'"
        ++i;
      }
    })
    let columns : string = " where "
    i = 0;
    this.tableInfo?.columns.forEach(column => {
      if(this.record[column.column_name] != "" && this.record[column.column_name] != null) {
        if(i !== 0) {
          columns += "and "
        }
        columns += column.column_name + "='" + this.record[column.column_name] + "' "
        ++i;
      }
    })
    this.dbService.sendQuery('UPDATE ' + this.passedData + setString + columns).subscribe({
      next: (val) => {
        console.log(val)
        this.clearResultInfoParagraph();
        this.router.navigate(['/view'], { state: {
            type: 'table_name',
            data: this.passedData
          }});
      },
      error: (e) => {
        const errorParagraph = document.getElementById("result_message") as HTMLInputElement
        errorParagraph.innerHTML = 'Could not delete record, error: <b>' + e.error.error_message + '</b>';
        console.log(e.error.error_message)
      }
    })
  }

  // editRecord() {
  //   this.clearResultInfoParagraph();
  //   this.router.navigate(['/view'], { state: {
  //       type: 'table_name',
  //       data: this.passedData
  //   }});
  // }
}
