import { Component, computed, inject } from '@angular/core';
import { PlacesService } from './services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './screens/map-view/map-view.component';
import { CorporateLogoComponent } from '@shared/components/corporate-logo/corporate-logo.component';
import { BtnMyLocationComponent } from '@shared/components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'shared-screen',
  standalone: true,
  imports: [LoadingComponent, CommonModule, MapViewComponent, CorporateLogoComponent, BtnMyLocationComponent, SearchBarComponent ],
  templateUrl: './map-screen.component.html',
})
export default class MapScreenComponent {

  public placesService = inject( PlacesService );

  public isUserLocationReady = computed(() =>  this.placesService.isUserLocationReadyComputed() )
  constructor(){
  }



}
