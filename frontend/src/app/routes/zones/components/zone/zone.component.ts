import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, Renderer2, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '@core/interfaces/country.interfaces';
import { ZoneService } from '@routes/zones/services/zone.service';
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface MultiSerieChar {
  name: string;
  series: Series[];
}

export interface Series {
  name: string;
  value: number;
}

export interface Grafics{
  name: string;
  value: string;
}

export enum Graficsenum {
  flame = 'flame',
  forest = 'forest',
  fire = 'fire',
  ocean = 'ocean',
}

const MAT_MODULE = [MatInputModule, MatSelectModule, MatFormFieldModule]
@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ReactiveFormsModule, MAT_MODULE ],
  providers: [ZoneService],
  templateUrl: './zone.component.html',
  styles: ``
})
export default class ZoneComponent implements OnInit {

  private readonly route = inject(Router);
  private readonly zoneService = inject(ZoneService);
  private readonly _destroyRef = inject(DestroyRef);
  public zones = signal<Country[]>([]);
  private renderer = inject(Renderer2);
  public multiSerieChart = signal<MultiSerieChar[]>([]);
  public selected = new FormControl('fire');
  private serieTemperature = signal<MultiSerieChar[]>([]);
  private serieHumidity = signal<MultiSerieChar[]>([]);

  public optionsGrafic: Grafics[] = [
    {
      name: 'Temperature',
      value: 'fire'
    },
    {
      name: 'Humidity',
      value: 'ocean'
    }
  ]

  public view = signal<[number, number]>([1920, 800]);
  // options
  public legend: boolean = true;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Day';
  public timeline: boolean = true;
  public yAxisLabel = signal<string>('Temperature');
  public colorScheme = signal<string>('fire');
  public schemeType: ScaleType = ScaleType.Linear;
  public gradient: boolean = false;
  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public legendPosition: LegendPosition = LegendPosition.Below;
  public xArialLabel2d:string = 'Range'


  @Input() id = 'id';
  ngOnInit(): void {
    if( !this.id ) this.route.navigate(['/home']);

    this.zoneService.getDataConditionsInterval(this.id)
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (zones) => {
          this.zones.set(zones);
          let series: Series[] = [];
          let seriesHumidity: Series[] = [];
          for(let zone of zones) {
            series.push({
              name: zone.entry.date,
              value: zone.temperature
            });
            seriesHumidity.push({
              name: zone.entry.date,
              value: zone.humidity
            });
          }
          let tempMultiSerie: MultiSerieChar = {
            name: zones[0].property.locality,
            series: this.sortSeries(series),
          }
          let multiSerieHumidity: MultiSerieChar = {
            name: zones[0].property.locality,
            series: this.sortSeries(seriesHumidity)
          }
          this.serieHumidity.set([multiSerieHumidity]);
          this.serieTemperature.set([tempMultiSerie]);
          this.multiSerieChart.set(this.serieTemperature());
        }
      });
    this.getViewportSize();
    this.renderer.listen('window', 'resize', () => {
      this.getViewportSize();
    });
  }


  sortSeries(series:Series[]){
    return series.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }


  onSelectInput(event:string){
    if( event === Graficsenum.ocean ){
      this.yAxisLabel.set('Humidity');
      this.colorScheme.set(Graficsenum.ocean);
      this.multiSerieChart.set(this.serieHumidity());
    }else if( event === Graficsenum.fire ){
      this.yAxisLabel.set('Temperature');
      this.colorScheme.set(Graficsenum.fire);
      this.multiSerieChart.set(this.serieTemperature());
    }
  }


  private getViewportSize() {
    const viewportWidth = window.innerWidth - 150;
    const viewportHeight = window.innerHeight - 150;
    this.view.set([viewportWidth, viewportHeight]);
  }


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
