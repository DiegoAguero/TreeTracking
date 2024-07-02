import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { environment } from '@environments/environments';
import { PlacesResponse } from '@maps/interfaces/places.interface';
import { places } from '@maps/mock/places';
import { Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CoreService {

  private http = inject(HttpClient);
  // Zone
  #zoneTree = signal<Country[]>([]);
  public zonesTreeComputed = computed(() => this.#zoneTree());
  private userLocation = signal<[number, number] | undefined>(undefined);
  public userLocationComputed = computed(() => this.userLocation());
  public numberLocations = computed(() => this.#zoneTree().length);
  public isVisibleMap = signal<boolean>(false);
  public informationGenrealByLocation = signal< PlacesResponse|undefined >(undefined);

  constructor() {
    this.getUserLocation()
      .then((userLocation) =>{
        this.getPlaces();
      })
      .catch((error) =>{
        // Managament error
      });
  }

  /**
   *
   * @param show boolean
   * Show/hide the map
   */
  toggleMapDiv(show: boolean) {
    this.isVisibleMap.set( show );
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise<[number, number]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation.update(currentValue => [coords.longitude, coords.latitude]);
          resolve([coords.longitude, coords.latitude]);
        },
        (err) => {
          this.userLocation.update(currentValue => [2.15899, 41.38879]); // Datos de Barcelona si se rechaza la geolocalización
          resolve([2.15899, 41.38879]);
        }
      )
    });
  }

  getPlaces():void{
    this.http.get<Country[]>(environment.URL_API_SENSOR)
      .subscribe({
        next: (zones: Country[]) => {
          if (zones) {
            this.#zoneTree.set(zones);
            return;
          }
          this.#zoneTree.set(places);
        },
        error: (err) => {
          this.#zoneTree.set(places);
        },
      });
  }

  getZonesByTemperature( min:number, max:number ):Observable<Country[]>{
    let params = new HttpParams()
      .set('min', min)
      .set('max', max);
    return this.http.get<Country[]>(`${environment.URL_API_SENSOR}/conditions/temperature`, { params })
      .pipe(
        tap( (country) => this.#zoneTree.set(country) )
      );
  }

  getZonesByHumidity(min: number, max: number): Observable<Country[]> {
    let params = new HttpParams()
      .set('min', min)
      .set('max', max);
    return this.http.get<Country[]>(`${environment.URL_API_SENSOR}/conditions/humidity`, { params })
      .pipe(
        tap((country) => this.#zoneTree.set(country))
      );
  }

  getZonesByTerm(query: string):Country[] {
    let caseQuery = query.toLowerCase();
    return this.#zoneTree().filter((zone) => {
      let { property } = zone;
      return (
        property.description.toLowerCase().includes(caseQuery) ||
        property.locality.toLowerCase().includes(caseQuery) ||
        property.country.toLowerCase().includes(caseQuery)
      );
    });
  }
}
