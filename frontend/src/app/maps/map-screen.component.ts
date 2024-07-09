import { Component, DestroyRef, computed, inject } from '@angular/core';
import { PlacesService } from './services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './screens/map-view/map-view.component';
import { CorporateLogoComponent } from '@shared/components/corporate-logo/corporate-logo.component';
import { BtnMyLocationComponent } from '@shared/components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { InformationComponent } from '@shared/components/information/information.component';
import { CoreService } from '@core/services/core.service';
import { InputRangeComponent } from '@shared/components/input-range/input-range.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'shared-screen',
  standalone: true,
  imports: [LoadingComponent, CommonModule, MapViewComponent, CorporateLogoComponent, BtnMyLocationComponent, SearchBarComponent, InformationComponent, InputRangeComponent ],
  templateUrl: './map-screen.component.html',
})
export default class MapScreenComponent {

  // MOCK
  public mockDateTemp = {
    min: 0,
    max: 100,
    initValue: 15
  }

  public mockHumity = {
    min: 0,
    max: 100,
    initValue: 50
  }
  public placesService = inject( PlacesService );
  public coreService = inject( CoreService );
  public isUserLocationReady = computed(() => this.coreService.userLocationComputed() );
  private readonly _destroyRef = inject(DestroyRef);
  constructor(){ }

  filterZones([min, value]: [number, number]){
    this.coreService.getZonesByTemperature(min, value)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  filterByHumidity([min, value]: [number, number]):void{
    this.coreService.getZonesByHumidity(min, value)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
