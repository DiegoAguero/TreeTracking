import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Feature } from '@maps/interfaces/places.interface';
import { MapService } from '@maps/services/map.service';
import { PlacesService } from '@maps/services/places.service';
import { BtnCustomComponent } from '@shared/components/btn-custom/btn-custom.component';

@Component({
  selector: 'maps-search-results',
  standalone: true,
  imports: [CommonModule, BtnCustomComponent],
  templateUrl: './search-results.component.html',
  styles: ``
})
export class SearchResultsComponent {

  public selectedId = signal<string>('');
  #placesSerive = inject(PlacesService);
  #mapService = inject(MapService);
  public isLoadingPLacesComputed = computed(() => this.#placesSerive.isLoadingPlaces());
  public placesComputed = computed(() => this.#placesSerive.placesSignal());

  flyTo(place: Feature) {
    this.selectedId.set(place.id);
    const [lng, lat] = place.center;
    this.#mapService.flyTo([lng, lat])
  }

  getDirections( place: Feature) {

    if( !this.#placesSerive.userLocationComputed() ) throw Error('Not found user location');

    this.#placesSerive.deletePlaces();

    const start = this.#placesSerive.userLocationComputed()!;
    const end = place.center as [number, number];

    this.#mapService.getRouteBetweenPoints( start, end )
  }

}
