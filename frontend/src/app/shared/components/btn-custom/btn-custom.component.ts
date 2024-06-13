import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'shared-btn-custom',
  standalone: true,
  imports: [],
  templateUrl: './btn-custom.component.html',
})
export class BtnCustomComponent {

  @Output()
  public emitClick = new EventEmitter<boolean>();
  public classBtn = input<string>('text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2', { alias: 'classTailwind'});
  public textBtn = input.required<string>();
  emitValue(){
    this.emitClick.emit( true )
  }
}
