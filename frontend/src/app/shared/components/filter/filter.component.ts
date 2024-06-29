import { Component, EventEmitter, Output, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{label()}}</mat-label>
      <input matInput (keyup)="applyFilter($event)" [placeholder]="placeholder()" #input>
    </mat-form-field>
  `,
  styles: ``
})
export class FilterComponent {
  @Output() filter: EventEmitter<string> = new EventEmitter();
  label = input<string>('Filter');
  placeholder = input<string>('Ex. name');

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.emit(filterValue);
  }
}
