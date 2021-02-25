import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';

const animArray = [
  trigger('row', [
    state(
      'in',
      style({
        opacity: 1,
      })
    ),
    state(
      'out',
      style({
        transform: 'scale(3)',
        opacity: 0,
      })
    ),
    transition('in => void', [
      animate(
        1000,
        style({
          transform: 'scale(3)',
          opacity: 0,
        })
      ),
    ]),
  ]),
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: animArray,
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: TableDataSource;

  // ANIMATIONS LOGIC
  @Input() colObject: { [name: string]: string };
  animState: 'in' | 'out';
  // indexObject: number[];
  @HostBinding('@.disabled') disabled = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[];
  logicColumns: string[];

  ngOnInit() {
    this.displayedColumns = Object.keys(this.colObject);
    this.logicColumns = Object.values(this.colObject);
    this.logicColumns.push('actions');

    this.dataSource = new TableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // this.paginator.page.subscribe(() => {
    //   this.disabled = true;
    // });
  }

  rowDisplay(index: number, row: any) {
    let array = this.logicColumns[index].split('.');
    let output = row;
    for (let element of array) {
      if (output === undefined || output === null) {
        output = 'NA';
        break;
      }
      output = output[element];
      if (output === undefined || output === null) {
        output = 'NA';
        break;
      }
    }
    return output;
  }

  deleteRow(index) {
    this.disabled = false;
    // this.dataSource.deleteRow(pageIndex, pageSize, i);
    // this.animState = this.animState === 'in' ? 'out' : 'in';
    // this.indexObject = [pageIndex, pageSize, i];

    this.dataSource.deleteRow(index);
    // console.log(index);
  }

  animEnded() {
    // console.log('animation ended');
    // this.dataSource.deleteRow(this.indexObject[0], this.indexObject[1], this.indexObject[2]);
    this.disabled = true;
  }
}
