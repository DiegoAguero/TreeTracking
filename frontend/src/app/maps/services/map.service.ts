import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DirectionsApiClient } from '@maps/api/directionsApiClient';
import { DirectionsResponse, Route } from '@maps/interfaces/directions.interface';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker } from 'mapbox-gl';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Whit Signals
  public mapSignal = signal<Map | undefined>(undefined);
  private readonly directionsApi = inject(DirectionsApiClient);
  private readonly _destroyRef = inject(DestroyRef);
  public routerDataShow = signal<DirectionsResponse |undefined>(undefined);

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

  flyTo(coords: LngLatLike, zoom:number = 14) {
    if (!this.isMapReadyComputed()) throw Error("Map is not ready");

    this.mapSignal()?.flyTo({
      zoom,
      center: coords
    });

    this.map?.flyTo({
      zoom,
      center: coords
    })
  }


  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(directionResponse => this.routerDataShow.set(directionResponse)),
        tap(console.log)
      )
      .subscribe(({ routes }) => this.drawPolyLine(routes[0]))
  }

  private drawPolyLine({ geometry, distance, duration }: Route) {
    const [start, end] = geometry.coordinates as [[number, number], [number, number]];
    const coords = geometry.coordinates;


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
            },
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
        'line-color': 'green',
        'line-width': 4,
        "line-width-transition": {
          'delay': 2,
          'duration': .4
        },
      },
      interactive: true
    });
  }
}
