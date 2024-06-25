import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { Accion } from '@core/interfaces/tabla-column.interface';
import { FireActionComponent } from '@shared/svg/fire-action/fire-action.component';
import { SearchComponent } from '@shared/svg/search/search.component';


@Component({
  selector: 'app-table-generic',
  standalone: true,
  imports: [ FireActionComponent, SearchComponent ],
  templateUrl: './table-generic.component.html',
  styleUrl: './table-generic.component.css'
})
export class TableGenericComponent {

  // ** Signals Table
  public titleS = signal<string>('');
  public columnS = signal<string[]>([]);
  public dataSourceS = signal<Country[]>([]);

  @Input() set title(title: string) {
    this.titleS.set( title );
  }

  @Input() set column(columns: string[]) {
    this.columnS.set( columns );
  }

  @Input() set dataSource(dataSource: Country[]) {
    this.dataSourceS.set( dataSource );
  }

  @Output() accion: EventEmitter<Accion> = new EventEmitter();

  onAction(action:string, row?: any ){
    this.accion.emit({ action: action, row: row });
  }


}
