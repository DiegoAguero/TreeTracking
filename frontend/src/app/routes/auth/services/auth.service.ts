import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CountryData, Locality } from '@core/interfaces/locality.interface';
import { environment } from '@environments/environments';
import { Observable, map, tap } from 'rxjs';
import { Login, Register, userRegisterResponseOk } from '../interfaces/auth.interface';

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
    const url = `${ environment.URL_API_SENSOR }/countries`;
    return this.http.get<CountryData[]>(url)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      );
  }

  loginUser(password: string, email: string): Observable<string>{
    const url = `${environment.URL_API_SENSOR}login`;
    const body:Login = { email , password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<string>(url, body, { headers })
  }

  registerUser(register: Register): Observable<userRegisterResponseOk>{
    const url = `${environment.URL_API_SENSOR}register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<userRegisterResponseOk>(url, register, { headers })
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      );
  }


  checkUserLoginByEmail(email:string): Observable<string>{
    let params = new HttpParams()
      .set('email', email);
    const url = `${environment.URL_API_SENSOR}/emailvalidation`;
    return this.http.get<string>(url, { params })
      .pipe(
        takeUntilDestroyed(this._destroyRef),
    )
  }

}

