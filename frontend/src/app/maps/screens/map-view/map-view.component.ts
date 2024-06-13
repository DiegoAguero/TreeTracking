import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { MapService } from '@maps/services/map.service';
import { PlacesService } from '@maps/services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private placesService = inject(PlacesService);
  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  public isReadyUserLocationComputed = computed(() => this.placesService.isUserLocationReadyComputed());
  private mapService = inject(MapService);


  constructor() {
  }

  ngAfterViewInit(): void {

    if (!this.placesService.userLocationComputed()) throw new Error('Error loacation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      // style: 'mapbox://styles/mapbox/light-v11',
      center: this.placesService.userLocationComputed(),
      zoom: 14, // starting zoom
    });

    // Encapsular
    const popup = new Popup()
      .setHTML(`
        <h6>I'm here</h6>
        <span>Estoy en este lugar del mundo!!</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocationComputed() ?? [-74.00597, 40.71427]) // New York
      .setPopup(popup)
      .addTo(map);


    // Encapsular
    this.mapService.setMap(map);

  }

}
