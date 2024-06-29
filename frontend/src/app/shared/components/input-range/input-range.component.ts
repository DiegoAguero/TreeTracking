import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, input, signal } from '@angular/core';

export interface RangeInput {
  min: number;
  max: number;
  initValue: number;
}

@Component({
  selector: 'app-input-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-range.component.html',
})
export class InputRangeComponent implements OnInit {

  textLabel = input<string>('º');
  range = input.required<RangeInput>();
  @Output() emiValueRange: EventEmitter<[number, number]> = new EventEmitter();
  valueSignalRange = signal<number>(0);
  emitValue(value: string): void{
    const valueNumber: number = parseInt(value);
    // crear servicio de emisión global.
    this.emiValueRange.emit([this.range().min, valueNumber]);
  }
  renderViewRange(value: string): void{
    const valueNumber: number = parseInt(value);
    this.valueSignalRange.set(valueNumber);
  }

  ngOnInit(): void {
    this.valueSignalRange.set(this.range().initValue);
  }
}
