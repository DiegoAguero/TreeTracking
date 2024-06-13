import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DirectionsApiClient } from '@maps/api/directionsApiClient';
import { DirectionsResponse, Route } from '@maps/interfaces/directions.interface';
import { Feature } from '@maps/interfaces/places.interface';
import { Zone } from '@maps/interfaces/places.interfaces';
import { places } from '@maps/mock/places';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, MarkerOptions, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // MOCK
  #mockPlaces = signal <Zone[]>(places);

  // Whit Signals
  private mapSignal = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);
  private directionsApi = inject(DirectionsApiClient);
  private http = inject(HttpClient);

  public isMapReadyComputed = computed(() => {
    return !!this.mapSignal();
  });

  constructor(){
    this.http.get('http://10.10.168.194:8080/sensor').subscribe(data => console.log(data))
  }


  // No signals
  private map?: Map;
  private numberLocations = signal<number>(0);

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map): void {
    this.map = map;
    this.mapSignal.set(map);
    this.createMarkesFromPlacesMock();
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReadyComputed()) throw Error("Map is not ready");

    this.mapSignal()?.flyTo({
      zoom: 14,
      center: coords
    });

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }


  createMarkesFromPlacesMock(){
    if (!this.mapSignal()) throw Error("Mapa no inicializado");
    this.markers.update(marker => []);
    const newMarkers: Marker[] = [];
    for (let { id, coords, isOnFire, description, humidity } of this.#mockPlaces()){
      // Comprobar el isOnFire
      const { coordX, coordY } = coords;
      const popup:Popup = new Popup()
        .setHTML(`
          <div
            class="popup-marker w-56 rounded-lg grid gap-2 p-2"
            data-id="${id}"
          >
            <h6 class="font-bold text-end" style="color: ${this.colorMarker(humidity)}">${humidity}%</h6>
            <span>${description}</span>
            <button class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-1 text-center me-2 mb-2">Information</button>
          </div>
        `);

      const options: MarkerOptions = {
        draggable: false,
        color: this.colorMarker(humidity)
      }
      const newMarker = new Marker(options)
        .setLngLat([coordY, coordX])
        .setPopup(popup)
        .addTo(this.mapSignal()!);
      newMarkers.push(newMarker)
    }

    this.markers.update(markers => ({
      markers,
      ...newMarkers
    }));

    if (this.#mockPlaces().length === 0) return;
    // LIMITES DEL MAPA (Subir el scroll de los mapas)

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    // bounds.extend(userLocation);
    this.mapSignal()!.fitBounds(bounds, {
      padding: 200
    });
  }

  colorMarker(humidity: number): string{
    // 0 - 30 yellow , 40 - 60 green , 60 - 100 lightblue
    if (humidity >= 0 && humidity < 30){
      return 'red';
    }
    if (humidity >= 30 && humidity < 60){
      return 'green';
    }
    if (humidity >= 60 && humidity <= 100){
      return 'blue';
    }
    return 'white';
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    // Crear instancias del erro para saber que error es
    if (!this.mapSignal()) throw Error("Mapa no inicializado");
    this.markers.update(marker => []);

    const newMarkers: Marker[] = [];

    for (const place of places) {

      const [lng, lat] = place.center;

      const popup = new Popup()
        .setHTML(`
          <h6>${place.text_es}</h6>
          <span>${place.place_name}</span>
        `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.mapSignal()!);

      newMarkers.push(newMarker)
    }

    this.markers.update(markers => ({
      markers,
      ...newMarkers
    }));

    if (places.length === 0) return;
    // LIMITES DEL MAPA (Subir el scroll de los mapas)

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.mapSignal()!.fitBounds(bounds, {
      padding: 200
    });

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(({ routes }) => this.drawPolyLine(routes[0]))
  }

  private drawPolyLine({ geometry, distance, duration }: Route) {

    const [start, end] = geometry.coordinates as [[number, number], [number, number]];
    const coords = geometry.coordinates;


    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.mapSignal()!.fitBounds(bounds, {
      padding: 200
    });

    //LineString
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Removemos el id
    if (this.mapSignal()!.getLayer('RouteString')) {
      this.mapSignal()!.removeLayer('RouteString');
      this.mapSignal()!.removeSource('RouteString');
    }

    this.mapSignal()!.addSource('RouteString', sourceData);

    this.mapSignal()!.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 4
      }
    });
  }

  deleteMarkers():void{
    this.markers.set([]);
  }
}
