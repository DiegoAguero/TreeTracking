import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'map',
    loadComponent: () => import('@maps/map-screen.component')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map'
  }
];
