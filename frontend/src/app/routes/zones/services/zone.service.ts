import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { environment } from '@environments/environments';
import { Observable } from 'rxjs';

@Injectable()
export class ZoneService {

  private http = inject(HttpClient);
  constructor() { }

  getCountryById(zoneId: string): Observable<Country>{
    const url = `${environment.URL_API_SENSOR}/conditions/ubication`;
    const params = new HttpParams()
      .set('id', zoneId);
    return this.http.get<Country>(url, { params })
  }

  getDataConditionsInterval(zoneId:string, days:number = 10): Observable<Country[]> {
    const url = `${environment.URL_API_SENSOR}/conditions/ubication/interval`;
    const params = new HttpParams()
      .set('id', zoneId)
      .set('days', days);
    return this.http.get<Country[]>(url, { params });
  }

}
