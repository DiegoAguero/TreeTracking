import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class PlacesApiClient extends HttpClient {

  public baseUrl: string = environment.URL_BASE;

  constructor(handler: HttpHandler) {
    super(handler);
  }

  /**
   * Sobrescribe la petición para que solo pase por la ruta que queremos.
   * @param url Partial url
   * @returns Response api MapBox
   */
  public override get<T>(url: string, options: {
    params?: HttpParams | {
      [param:string]: string |number | boolean | ReadonlyArray<string |number|boolean>
    }
  }) {
    url = this.baseUrl + url;
    return super.get<T>( url, {
      params:{
        limit: 5,
        language: 'es', // Definir en la app
        access_token: environment.TOKEN_MAP_BOX,
        ...options.params
      }
    });

  }
}
