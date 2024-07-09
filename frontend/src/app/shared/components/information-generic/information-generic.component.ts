import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckCircleComponent } from '@shared/svg/check-circle/check-circle.component';

interface inforGeneral {
  classLi: string;
  svgClass: string;
  textSvg: string;
}


@Component({
  selector: 'app-information-generic',
  standalone: true,
  imports: [ CheckCircleComponent, RouterModule ],
  templateUrl: './information-generic.component.html',
  styles: ``
})
export class InformationGenericComponent {

  public inforGeneral: inforGeneral[] = [
    {
      classLi: 'flex items-center gap-3 text-neutral-800',
      svgClass: 'w-5 h-5 fill-green-200',
      textSvg: 'Monitoreo y predicción de la vegetación.'
    },
    {
      classLi: 'flex items-center gap-3 text-neutral-800',
      svgClass: 'w-5 h-5 fill-green-200',
      textSvg: 'Medición de distancias.'
    },
    {
      classLi: 'flex items-center gap-3 text-neutral-800',
      svgClass: 'w-5 h-5 fill-green-200',
      textSvg: 'Temperatura y predicciones del tiempo.'
    },
  ];

  link = input<boolean>(false);

}
