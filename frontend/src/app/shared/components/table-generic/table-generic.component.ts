import { AfterViewInit, Component, OnInit, ViewChild, effect, input, signal } from '@angular/core';
import { FireActionComponent } from '@shared/svg/fire-action/fire-action.component';
import { SearchComponent } from '@shared/svg/search/search.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


const MAT_MODULE = [MatSortModule, MatTableModule, CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-table-generic',
  standalone: true,
  imports: [FireActionComponent, SearchComponent, MAT_MODULE, FilterComponent, RouterModule],
  templateUrl: './table-generic.component.html',
  styles: `
    table {
      width: 100%;
    }

    th.mat-sort-header-sorted {
      color: black;
    }
    .mat-mdc-table {
      width: 100%;
      max-height: 100vh;
      overflow: auto;
    }

    .mat-column-name {
      height: 100px;
    }
    tr{
      width: 100% !important;
    }
  `
})
export class TableGenericComponent<T> implements AfterViewInit, OnInit {

  @ViewChild(MatSort)
    private readonly sort!: MatSort;

  @ViewChild(MatPaginator)
    private readonly paginator!:MatPaginator;


  // ** Signals Table
  titleS = input<string>('');
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();


  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');
  sortableColumns = input<string[]>([]);

  constructor(){
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }

      if (this.data()) {
        this.dataSource.data = this.data();
      }
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataComputed(data:T){
    return typeof data === 'boolean';
  }
}
