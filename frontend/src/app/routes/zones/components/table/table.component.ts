import { Component, OnInit, computed, inject } from '@angular/core';
import { getEntityProperties } from '@core/interfaces/tabla-column.interface';
import { CoreService } from '@core/services/core.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { TableGenericComponent } from '@shared/components/table-generic/table-generic.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [LoadingComponent, TableGenericComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export default class TableComponent implements OnInit {

  private coreService = inject(CoreService);
  public dataService = computed( () =>
    this.coreService.zonesTreeComputed()
  );
  public colums: string[] = [];

  constructor(){
  }
  ngOnInit(): void {
    this.colums = getEntityProperties('country');
  }
}
