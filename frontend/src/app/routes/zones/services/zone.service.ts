import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { environment } from '@environments/environments';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ZoneService {

  private http = inject(HttpClient)
  constructor() { }

  getCountryById(zoneId: string): Observable<Country>{
    const url = `${environment.URL_API_SENSOR}/conditions/ubication`;
    const params = new HttpParams()
      .set('id', zoneId);
    return this.http.get<Country>(url, { params })
  }

}
