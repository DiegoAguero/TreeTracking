import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

const MAT_MODULES = [MatCardModule, MatButtonModule, MatIconModule]

@Component({
  selector: 'app-snackbar-custom',
  standalone: true,
  imports: [MAT_MODULES],
  templateUrl: './snackbar-custom.component.html',
  styles: ``
})
export class SnackbarCustomComponent<T> {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: T | any){}

  closeSnakBar(){
    this.data.snackBar.dismiss();
  }
}
