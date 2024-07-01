import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CountryData, Locality } from '@core/interfaces/locality.interface';
import { environment } from '@environments/environments';
import { Observable, filter, map } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);
  constructor() { }

  getLocality(country:string): Observable<Locality[]>{
    const url = `${environment.URL_API_SENSOR }/localities`;
    return this.http.get<Locality[]>(url)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((localities: Locality[]) => localities.filter(locality => locality.countryName === country))
      );
  }

  getCountry():Observable<CountryData[]>{
    const url = `${environment.URL_API_SENSOR }/countries`;
    return this.http.get<CountryData[]>(url)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      );
  }

}

