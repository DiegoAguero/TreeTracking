import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewContainerRef, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { Country } from '@core/interfaces/country.interfaces';
import { CoreService } from '@core/services/core.service';

import { MapService } from '@maps/services/map.service';
import { PlacesService } from '@maps/services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { IPopup } from '@shared/interfaces/popup.interface';

import { typeSVG } from '@shared/svg/svg';
import { CONSTANTES } from '@utils/constantes';
import { Map, Popup, Marker, MarkerOptions, LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent, PopupComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private coreService = inject(CoreService);
  private mapService = inject(MapService);
  private mapSignal = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);

  /** Injectors **/
  private viewContainerRef = inject(ViewContainerRef);


  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  public isReadyUserLocationComputed = computed(() => this.coreService.userLocationComputed() );

  constructor() {
    effect(() => {
      if (this.mapService.isMapReadyComputed()) {
        if (this.coreService.zonesTreeComputed().length > 0){
          this.addPopupToMap(this.coreService.zonesTreeComputed());
        }
      }
    }, { allowSignalWrites: true }); // Enable signal writes
  }

  ngAfterViewInit(): void {

    if (!this.coreService.userLocationComputed()) throw new Error('Error loacation');
    this.mapSignal.set(new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      // style: 'mapbox://styles/mapbox/light-v11',
      center: this.coreService.userLocationComputed() ?? [2.15899, 41.38879],
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
      .setLngLat(this.coreService.userLocationComputed() ?? [2.15899, 41.38879]) // Barcelona
      .setPopup(popup)
      .addTo(this.mapSignal()!);


    // Dowload map.
    this.mapService.setMap(this.mapSignal()!);

  }

  addPopupToMap( countries:Country[]):void{
    const newMarkers: Marker[] = [];
    for (let country of countries) {

      let { property, humidity } = country;
      let svg = typeSVG(humidity);
      // Comprobar el isOnFire
      const { coord_x, coord_y } = property;

      let colorSvgClimate = CONSTANTES.COLOR_CLIMATE.colour(country.temperature)

      const popupNode = document.createElement('div');

      const view = this.viewContainerRef.createComponent(PopupComponent);
      /** Data for Popup **/
      const IPopup: IPopup = {
        country: country,
        svg: svg,
        color: this.colorMarker(humidity),
        colorSvgClimate: colorSvgClimate
      };

      view.instance.IPopup = IPopup;

      popupNode.appendChild(view.location.nativeElement);

      const popup: Popup = new Popup()
        .setDOMContent(popupNode);

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

}
