import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DirectionsApiClient } from '@maps/api/directionsApiClient';
import { DirectionsResponse, Route } from '@maps/interfaces/directions.interface';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker } from 'mapbox-gl';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Whit Signals
  public mapSignal = signal<Map | undefined>(undefined);
  private readonly directionsApi = inject(DirectionsApiClient);
  private readonly _destroyRef = inject(DestroyRef);

  public isMapReadyComputed = computed(() => {
    return !!this.mapSignal();
  });

  // No signals
  private map?: Map;
  public numberLocations = signal<number>(0);

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map): void {
    this.map = map;
    this.mapSignal.set(map);
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


  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
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
}
