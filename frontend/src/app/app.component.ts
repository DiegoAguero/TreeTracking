import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { CoreService } from '@core/services/core.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'map-angular-17';
  private coreService = inject(CoreService);
  public routes = signal<Routes>(routes);

  constructor(){
    this.coreService
  }
}
