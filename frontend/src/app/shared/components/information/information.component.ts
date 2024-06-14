import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, input, signal } from '@angular/core';
import { ZonesInformation } from '@maps/interfaces/zonesInformation.interface';
import { CONSTANTES } from '@utils/constantes';

@Component({
  selector: 'shared-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

  @ViewChild('popup')
    private popup!:ElementRef;
  numberItems = input<number>(0);
  isClosePopup = signal<boolean>(false);

  public zones: Array<ZonesInformation> = [
    {
      title: 'Dangerous zone',
      color: 'color: red;',
      bgColor: `background-color:${CONSTANTES.COLORS.RED};`
    },
    {
      title: 'Conform zone',
      color: 'color: green;',
      bgColor: `background-color:${CONSTANTES.COLORS.GREEN};`
    },
    {
      title: 'Humidity zone',
      color: 'color: blue;',
      bgColor: `background-color:${CONSTANTES.COLORS.BLUE};`
    },
  ];

  closePopup(){
    this.isClosePopup.set( !this.isClosePopup() );
  }
}
