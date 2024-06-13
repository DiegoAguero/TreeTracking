import { Component, inject, input } from '@angular/core';
import { MapService } from '@maps/services/map.service';
import { PlacesService } from '@maps/services/places.service';

@Component({
  selector: 'shared-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  // Dependencias del button
  private mapService = inject(MapService);
  private placesService = inject(PlacesService);
  public txtButton = input.required<string>({ alias: 'btn-text' });

  goToMyLocation() {
    if (!this.placesService.userLocationComputed()) throw Error('No user location');
    if (!this.mapService.isMapReadyComputed()) throw Error('The map is not ready');
    this.mapService.flyTo(this.placesService.userLocationComputed()!);
  }
}
