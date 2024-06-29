import { Component, OnInit, computed, inject } from '@angular/core';
import { ColumnKeys, dataComputedCountry, getEntityCountryTable } from '@core/interfaces/tabla-column.interface';
import { CoreService } from '@core/services/core.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { TableGenericComponent } from '@shared/components/table-generic/table-generic.component';
import { MatCardModule } from '@angular/material/card';


const MAT_MODULES = [MatCardModule];
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [LoadingComponent, TableGenericComponent, MAT_MODULES],
  templateUrl: './table.component.html',
  styles: ''
})
export default class TableComponent implements OnInit {

  private coreService = inject(CoreService);
  public dataService = computed( () =>
    getEntityCountryTable(this.coreService.zonesTreeComputed())
  );
  public displayColumns: ColumnKeys<dataComputedCountry> = ['country', 'locality', 'humidity', 'fire_detected', 'description', 'actions'];
  sortables: ColumnKeys<dataComputedCountry> = ['country', 'locality', 'humidity', 'fire_detected', 'description'];

  constructor(){
  }
  ngOnInit(): void {

  }
}
