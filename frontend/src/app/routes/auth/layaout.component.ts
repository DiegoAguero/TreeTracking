import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layaout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="w-full h-full p-10">
      <router-outlet />
    </section>
  `,
  styles: `
  `,
  providers: []
})
export default class LayaoutComponent {

}
