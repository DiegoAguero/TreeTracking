import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Country } from '@core/interfaces/country.interfaces';
import { PlacesApiClient } from '@maps/api/placesApiClient';
import { Feature, PlacesResponse } from '@maps/interfaces/places.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly placesApi = inject(PlacesApiClient);
  private readonly _destroyRef = inject(DestroyRef);
  public isLoadingPlaces = signal<boolean>(false);
  public placesSignal = signal<Feature[]>([]);
  public zonesSignal = signal<Country[]>([]);

  constructor() {
  }

  getPlacesByQuery(countries: Country[], userLOcation: [number, number]):void {
    this.isLoadingPlaces.set(!this.isLoadingPlaces());
    if (countries.length === 0) {
      this.isLoadingPlaces.set(false);
      this.deletePlaces();
      return;
    }

    if (!userLOcation) throw Error('No se pudo obtener la geolocalización');

    this.zonesSignal.set(countries);
    this.isLoadingPlaces.set(!this.isLoadingPlaces());

  }

  deletePlaces(){
    this.placesSignal.set([]);
    this.zonesSignal.set([]);
  }

}
