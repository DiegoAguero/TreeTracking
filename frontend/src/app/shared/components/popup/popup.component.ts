import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '@core/interfaces/country.interfaces';
import { IPopup } from '@shared/interfaces/popup.interface';
import { ThermometerComponent } from '@shared/svg/thermometer/thermometer.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ThermometerComponent],
  templateUrl: './popup.component.html',
})
export class PopupComponent implements AfterViewInit {

  @ViewChild('refsvg') containerSvg!: ElementRef<HTMLDivElement>;
  public country = signal<Country | undefined>(undefined);
  public color = signal<string>('#000000');
  public svg = signal<string>('');
  private router = inject(Router);
  public svgClimateColor = signal<string>('#000000');

  @Input({ required: true })
  set IPopup({ country, svg, color, colorSvgClimate }: IPopup){
      this.country.set( country );
      this.color.set( color );
      this.svg.set( svg );
      this.svgClimateColor.set(colorSvgClimate);
    };

  ngAfterViewInit(): void {
    if (this.containerSvg && this.svg().length > 0 ){
      this.containerSvg.nativeElement.innerHTML = this.svg();
    }
  }

  showPlace(id:number | undefined){
    if( !id ) return;
    this.router.navigateByUrl(`/zone/${id}`);
  }

}
