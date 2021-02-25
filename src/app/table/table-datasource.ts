import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject, from } from 'rxjs';

// TODO: Replace this with your own data model type
// export interface TableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
const EXAMPLE_DATA: any[] = [
  { id: 1, address: { name: 'Hydrogen', street: 'asivalayam' }, third: 'vinod' },
  { id: 2, address: { name: 'Helium', street: 'bsivalayam' }, third: 'vinod' },
  { id: 3, address: { name: 'Lithium', street: null }, third: 'vinod' },
  { id: 4, address: 'testing', third: 'raju' },
  { id: 5, address: { name: 'Boron', street: 'esubasham' }, third: 'raju' },
  { id: 6, address: { name: 'Carbon', street: 'fsubasham' }, third: 'raju' },
  { id: 7, address: { name: 'Nitrogen', street: 'gsivalayam' }, third: 'raju' },
  { id: 8, address: { name: 66, street: 66 }, third: 'raju' },
  { id: 9, address: { name: 'Fluorine', street: 'isubasham' }, third: 'raju' },
  { id: 10, address: { name: 'Neon', street: 'jsubasham' }, third: 'raju' },
  { id: 11, address: { name: 'Sodium', street: 'ksivalayam' }, third: 'raju' },
  { id: 12, address: { name: 'Magnesium', street: 'lsubasham' }, third: 'raju' },
  { id: 13, address: { name: 'Aluminum', street: 'msubasham' }, third: 'vinod' },
  { id: 14, address: { name: 'Silicon', street: 'nsivalayam' }, third: 'vinod' },
  { id: 15, address: { name: 'Phosphorus', street: 'osubasham' }, third: 'vinod' },
  { id: 16, address: { name: 'Sulfur', street: 'psivalayam' }, third: 'vinod' },
  { id: 17, address: { name: 'Chlorine', street: 'sivalayam' }, third: 'vinod' },
  { id: 18, address: { name: 'Argon', street: 'qsivalayam' }, third: 'vinod' },
  { id: 19, address: { name: 'Potassium', street: 'ssivalayam' }, third: 'vinod' },
  { id: 20, address: { name: 'Calcium', street: 'tsubasham' }, third: 'vinod' },
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<any> {
  data: any[] = [];
  //   = EXAMPLE_DATA.map((ele, index) => {
  //   ele['asdfghjkl'] = index;
  //   return ele;
  // });
  paginator: MatPaginator;
  sort: MatSort;

  arrayChage = new Subject();

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    let dataObservable = from(
      fetch('http://localhost:3000/api/getdata')
        .then((res) => res.json())
        .then((res) => {
          this.data = res.map((ele, index) => {
            ele['asdfghjkl'] = index;
            return ele;
          });
          console.log('logging');
          return this.data;
        })
    );

    const dataMutations = [
      // observableOf(this.data),
      dataObservable,
      this.paginator.page,
      this.sort.sortChange,
      this.arrayChage.asObservable(),
    ];

    return merge(...dataMutations).pipe(
      map((event) => {
        // if (event instanceof PageEvent) {

        // }
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      // switch (this.sort.active) {
      //   case 'name':
      //     return compare(a.name, b.name, isAsc);
      //   case 'id':
      //     return compare(+a.id, +b.id, isAsc);
      //   default:
      //     return 0;
      // }
      // console.log(this.sort.active);
      let array = this.sort.active.split('.');
      for (let element of array) {
        if (a === undefined || a === null) {
          return 1 * (isAsc ? 1 : -1);
        }
        a = a[element];
        if (a === undefined || a === null) {
          return 1 * (isAsc ? 1 : -1);
        }
      }
      for (let element of array) {
        if (b === undefined || b === null) {
          return -1 * (isAsc ? 1 : -1);
        }
        b = b[element];
        if (b === undefined || b === null) {
          return -1 * (isAsc ? 1 : -1);
        }
      }

      return compare(a, b, isAsc);
    });
  }

  deleteRow(index) {
    // console.log(pageIndex, pageSize, i);
    // console.log(index);
    let i = this.data.findIndex((ele) => {
      if (ele['asdfghjkl'] === index) {
        return true;
      }
      return false;
    });
    this.data.splice(i, 1);
    this.arrayChage.next();
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  if (typeof a === 'string' || typeof b === 'string') {
    a = a.toString();
    b = b.toString();
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
