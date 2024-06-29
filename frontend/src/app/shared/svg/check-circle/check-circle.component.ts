import { Component, input } from '@angular/core';

@Component({
  selector: 'app-check-circle',
  standalone: true,
  imports: [],
  templateUrl: './check-circle.component.html',
})
export class CheckCircleComponent {
  titleSpan = input<string>();
  classSvg = input<string>('w-5 h-5 fill-green-200');
}
