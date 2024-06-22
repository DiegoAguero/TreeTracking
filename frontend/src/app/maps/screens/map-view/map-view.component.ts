import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { Country } from '@maps/interfaces/country.interfaces';
import { MapService } from '@maps/services/map.service';
import { PlacesService } from '@maps/services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { typeSVG } from '@shared/svg/svg';
import { CONSTANTES } from '@utils/constantes';
import { Map, Popup, Marker, MarkerOptions, LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);
  private mapSignal = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);


  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  public isReadyUserLocationComputed = computed(() => this.placesService.isUserLocationReadyComputed() );

  constructor() {
    effect(() => {
      if (this.mapService.isMapReadyComputed()) {
        if (this.mapService.zonesTreeComputed().length > 0){
          this.addPopupToMap(this.mapService.zonesTreeComputed());
        }
      }
    }, { allowSignalWrites: true }); // Enable signal writes
  }

  ngAfterViewInit(): void {

    if (!this.placesService.userLocationComputed()) throw new Error('Error loacation');

    this.mapSignal.set(new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      // style: 'mapbox://styles/mapbox/light-v11',
      center: this.placesService.userLocationComputed() ?? [-74.00597, 40.71427],
      zoom: 14, // starting zoom
    }));

    // Encapsular
    const popup = new Popup()
      .setHTML(`
        <h6>I'm here</h6>
        <span>Estoy en este lugar del mundo!!</span>
      `);

    if( !this.mapSignal() ) return;
  
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocationComputed() ?? [-74.00597, 40.71427]) // New York
      .setPopup(popup)
      .addTo(this.mapSignal()!);


    // Encapsular
    this.mapService.setMap(this.mapSignal()!);

  }

  addPopupToMap( countries:Country[]):void{
    const newMarkers: Marker[] = [];
    for (let { id_condition, property, fire_detected, humidity, temperature } of countries) {
      let svg = typeSVG(humidity);
      // Comprobar el isOnFire
      const { id_property, coord_x, coord_y, description } = property;
      const popup: Popup = new Popup()
        .setHTML(`
          <div
            class="popup-marker w-56 rounded-lg grid gap-2 p-2"
            data-id="${id_property}"
          >
            <div class="flex justify-end">
              ${svg}
              <h6 class="font-bold text-end" style="color: ${this.colorMarker(humidity)}">${humidity}%</h6>
            </div>
            <span>${description}</span>
            <button (click)="showPlace(${id_property})" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-1 text-center me-2 mb-2">Information</button>
          </div>
        `);

      const options: MarkerOptions = {
        draggable: false,
        color: this.colorMarker(humidity)
      }
      const newMarker = new Marker(options)
        .setLngLat([coord_y, coord_x])
        .setPopup(popup)
        .addTo(this.mapSignal()!);
      newMarkers.push(newMarker);
    }
    this.markers.update(markers => ({
      markers,
      ...newMarkers
    }));
  

    // const bounds = new LngLatBounds();
    // newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    // this.mapSignal()!.fitBounds(bounds, {
    //   padding: 200
    // });

  }

  colorMarker(humidity: number): string {
    // 0 - 30 red , 40 - 60 green , 60 - 100 lightblue
    if (humidity >= 0 && humidity < 30) {
      return CONSTANTES.COLORS.RED;
    }
    if (humidity >= 30 && humidity < 60) {
      return CONSTANTES.COLORS.GREEN;
    }
    if (humidity >= 60 && humidity <= 100) {
      return CONSTANTES.COLORS.BLUE;
    }
    return 'white';
  }

  showPlace(id: string) {
    console.log(id);
  }

}
