import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";


@Injectable({
  providedIn: 'root',
})
export class DirectionsApiClient extends HttpClient {

  public baseUrl: string = environment.URL_DIRECTIONS;

  constructor(handler: HttpHandler) {
    super(handler);
  }

  /**
   * Sobrescribe la petición para que solo pase por la ruta que queremos.
   * @param url Partial url
   * @returns Response api MapBox
   */
  public override get<T>(url: string) {

    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es', // Definir en la app
        overview: 'full',
        steps: false,
        access_token: environment.TOKEN_MAP_BOX,
      }
    });

  }
}
