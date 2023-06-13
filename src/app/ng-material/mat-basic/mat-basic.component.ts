import {Component, OnInit} from '@angular/core';
import {DbHealth} from "../../models/db-status-model";
import {DbHealthService} from "../../services/db-health.service";

@Component({
  selector: 'app-mat-basic',
  templateUrl: './mat-basic.component.html',
  styleUrls: ['./mat-basic.component.css']
})
export class MatBasicComponent implements OnInit{
  dbHealth: DbHealth | undefined = undefined;

  constructor(private dbHealthService: DbHealthService) {}

  ngOnInit(): void {
    this.dbHealthService.getDatabaseStatus().subscribe({
        next: res => {
          this.dbHealth = res;
        },
        error: err => {
          console.log('error downloading db status');
        }
      }
    )
  }
}
