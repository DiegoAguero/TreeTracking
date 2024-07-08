import { Component, ElementRef, ViewChild, ViewContainerRef, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { CoreService } from '@core/services/core.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { routes } from './app.routes';
import { Map, Popup, Marker, MarkerOptions, LngLatBounds } from 'mapbox-gl';
import { MapService } from '@maps/services/map.service';
import { CONSTANTES } from '@utils/constantes';
import { Country } from '@core/interfaces/country.interfaces';
import { typeSVG } from '@shared/svg/svg';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { IPopup } from '@shared/interfaces/popup.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PopupComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private coreService = inject(CoreService);
  private mapService = inject(MapService);
  public routes = signal<Routes>(routes);

  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  private markers:Marker[] = []; //
  public computedShowMap = computed<boolean>(() => this.coreService.isVisibleMap());
  /** Injectors **/
  private viewContainerRef = inject(ViewContainerRef);
  private numberZonesStatic!: number;
  constructor(){
    this.coreService;
    effect(() => {
      if(!this.coreService.userLocationComputed()) return;
      if (this.coreService.zonesTreeComputed().length > 0 ){
        this.createMap();
      }
    }, { allowSignalWrites: true });
  }

  createMap(){
    if (!this.mapService.mapSignal()){
      this.mapService.mapSignal.set(new Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/standard',
        // style: 'mapbox://styles/mapbox/light-v11',
        center: this.coreService.userLocationComputed() ?? [2.15899, 41.38879],
        zoom: 5, // starting zoom
      }));

      this.numberZonesStatic = this.coreService.zonesTreeComputed().length;

      if (!this.mapService.mapSignal()) return;
      this.addPopupToMap(this.coreService.zonesTreeComputed());

      // Dowload map.
      this.mapService.setMap(this.mapService.mapSignal()!);
    }
    if( this.computedShowMap() && this.mapDivElement.nativeElement.classList.contains('hidden') ){
      this.mapDivElement.nativeElement.classList.remove('hidden');
    } else if (!this.computedShowMap() && !this.mapDivElement.nativeElement.classList.contains('hidden')){
      this.mapDivElement.nativeElement.classList.add('hidden');
    }

    if (this.numberZonesStatic !== this.coreService.zonesTreeComputed().length){
      this.removePopMap();
      this.addPopupToMap(this.coreService.zonesTreeComputed());
    }
  }
  /**
   * Function to add markers on the map
   * @param countries
   */
  addPopupToMap(countries: Country[]): void {
    const newMarkers: Marker[] = [];
    for (let country of countries) {

      let { property, humidity } = country;
      let svg = typeSVG(humidity);
      // Comprobar el isOnFire
      const { coord_x, coord_y } = property;

      let colorSvgClimate = CONSTANTES.COLOR_CLIMATE.colour(country.temperature)

      const popupNode = document.createElement('div');
      // Instance of the component
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
        .addTo(this.mapService.mapSignal()!);
      newMarkers.push(newMarker);
      this.markers.push(newMarker)
    }

  }

  removePopMap(){
    // Remueve los popups segun el dato del filtro.
    for(let marker of this.markers){
      marker.remove();
    }
    this.numberZonesStatic = this.coreService.zonesTreeComputed().length;
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
