import { Injectable, computed, inject, signal } from '@angular/core';
import { PlacesApiClient } from '@maps/api/placesApiClient';
import { Feature, PlacesResponse } from '@maps/interfaces/places.interface';
import { map } from 'rxjs';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject(PlacesApiClient);
  private userLocation = signal<[number, number] | undefined>(undefined);
  #mapService = inject( MapService );
  public isLoadingPlaces = signal<boolean>(false);
  public placesSignal = signal<Feature[]>([]);

  public userLocationComputed = computed(() => this.userLocation());

  public isUserLocationReadyComputed = computed(() => {
    return !!this.userLocation();
  });

  constructor() {
    this.getUserLocation();
  }


  public async getUserLocation(): Promise<[number, number]> {
    return new Promise<[number, number]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation.update(currentValue => [coords.longitude, coords.latitude]);
          resolve([coords.longitude, coords.latitude]);
        },
        (err) => {
          console.log(err);
          alert('No se pudo obtener la geolocalización');
          reject();
        }
      )
    });
  }

  getPlacesByQuery(query: string = '') {
    if( query.length === 0 ){
      this.isLoadingPlaces.set( false );
      this.deletePlaces();
      return;
    }

    if (!this.userLocation()) throw Error('No se pudo obtener la geolocalización');

    this.isLoadingPlaces.set(!this.isLoadingPlaces());
    const url: string = `/${query}.json`;

    return this.placesApi.get<PlacesResponse>(url, {
      params: {
        proximyty: this.userLocation()!.join(',')
      }
    })
      .pipe(
        map(response => response.features)
      ).subscribe(
        {
          next: (features) => {
            this.isLoadingPlaces.set(!this.isLoadingPlaces());
            this.placesSignal.set(features);
            this.#mapService.createMarkersFromPlaces(this.placesSignal(), this.userLocationComputed()! )
          }
        }
      )
  }

  deletePlaces(){
    this.placesSignal.set([]);
    this.#mapService.deleteMarkers();
  }

}
