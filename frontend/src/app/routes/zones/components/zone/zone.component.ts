import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Country } from '@core/interfaces/country.interfaces';
import { ZoneService } from '@routes/zones/services/zone.service';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './zone.component.html',
  styles: ``
})
export default class ZoneComponent implements OnInit {

  private readonly route = inject(Router);
  private readonly zoneService = inject(ZoneService);
  private readonly _destroyRef = inject(DestroyRef);
  public zone!: Country;
  @Input() id = 'id';
  ngOnInit(): void {
    if( !this.id ) this.route.navigate(['/home']);
    this.zoneService.getCountryById(this.id)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (zone:Country) => {
          this.zone = zone;
        }
    })
  }

}
