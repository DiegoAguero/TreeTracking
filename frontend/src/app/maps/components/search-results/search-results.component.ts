import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { CoreService } from '@core/services/core.service';
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

  public selectedId = signal<number>(0);
  readonly #placesSerive = inject(PlacesService);
  readonly #coreService = inject(CoreService);
  readonly #mapService = inject(MapService);
  public isLoadingPLacesComputed = computed(() => this.#placesSerive.isLoadingPlaces());
  public placeComputed = computed(() => this.#placesSerive.zonesSignal());
  @Output() emitSearch = new EventEmitter<boolean>();

  flyTo({ property }: Country) {
    this.selectedId.set(property.id_property);
    const { coord_x, coord_y } = property;
    this.#mapService.flyTo([coord_y, coord_x]);
  }

  getDirections({ property }: Country) {
    if( !this.#coreService.userLocationComputed() ) throw Error('Not found user location');
    this.#placesSerive.deletePlaces();
    const start = this.#coreService.userLocationComputed()!;
    let center = [ property.coord_y, property.coord_x ];
    const end = center as [number, number];
    this.#mapService.getRouteBetweenPoints( start, end );
    this.emitSearch.emit(true);
  }

}
