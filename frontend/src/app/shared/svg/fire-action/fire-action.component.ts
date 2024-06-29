import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fire-action',
  standalone: true,
  imports: [],
  templateUrl: './fire-action.component.html',
})
export class FireActionComponent {

  isFire = input.required<boolean>();
}
