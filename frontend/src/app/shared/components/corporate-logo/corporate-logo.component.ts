import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'shared-corporate-logo',
  standalone: true,
  imports: [],
  templateUrl: './corporate-logo.component.html',
  styleUrl: './corporate-logo.component.css'
})
export class CorporateLogoComponent {


  #imgDefault = '../../../../assets/tree-logo.png';
  /** Legacy Input */
  @Input({})
  public srcImage:string = this.#imgDefault;

  /** Input signal  */
  public srcInputSignal = input<string>(this.#imgDefault, { alias: 'image' });
  /** Alt is required */
  public altImage = input.required<string>({});
}
