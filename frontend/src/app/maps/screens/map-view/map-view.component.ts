import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, computed, inject, OnDestroy } from '@angular/core';

import { CoreService } from '@core/services/core.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PopupComponent } from '@shared/components/popup/popup.component';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent, PopupComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit, OnDestroy {

  private coreService = inject(CoreService);

  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  public isReadyUserLocationComputed = computed(() => this.coreService.userLocationComputed() );

  constructor() {
  }

  ngAfterViewInit(): void {

    if (!this.coreService.userLocationComputed()) throw new Error('Error loacation');
    this.coreService.toggleMapDiv(true);
  }

  ngOnDestroy(): void {
    this.coreService.toggleMapDiv(false);
  }

}
