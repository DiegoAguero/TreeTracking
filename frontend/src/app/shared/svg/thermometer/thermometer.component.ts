import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thermometer.component.html',
})
export class ThermometerComponent {
  public colorSvg = input.required<string>();
  public sizeSvg = input({ width: '20px', height: '20px'}, {
    alias: 'sizeSvg',
    transform: (size: { width: number, height: number }) => ({ width: `${size.width}px`, height: `${size.height}px` })
  });

}
