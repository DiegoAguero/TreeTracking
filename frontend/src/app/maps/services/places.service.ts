import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  constructor() {
  }

  getPlacesByQuery(query: string = '', userLOcation:[number, number]) {
    if( query.length === 0 ){
      this.isLoadingPlaces.set( false );
      this.deletePlaces();
      return;
    }

    if (!userLOcation) throw Error('No se pudo obtener la geolocalización');

    this.isLoadingPlaces.set(!this.isLoadingPlaces());
    const url: string = `/${query}.json`;

    return this.placesApi.get<PlacesResponse>(url, {
      params: {
        proximyty: userLOcation!.join(',')
      }
    })
      .pipe(
        map(response => response.features),
        takeUntilDestroyed(this._destroyRef)
      ).subscribe(
        {
          next: (features) => {
            this.isLoadingPlaces.set(!this.isLoadingPlaces());
            this.placesSignal.set(features);
          }
        }
      )
  }

  deletePlaces(){
    this.placesSignal.set([]);
  }

}
