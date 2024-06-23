import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fire-action',
  standalone: true,
  imports: [],
  templateUrl: './fire-action.component.html',
  styleUrl: './fire-action.component.css'
})
export class FireActionComponent {

  isFire = input.required<boolean>();
}
