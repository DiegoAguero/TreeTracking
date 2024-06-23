import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'table',
    title: 'Tabla',
    loadComponent: () => import('@routes/zones/components/table/table.component'),
    children: [
    ]
  },
  {
    path: 'map',
    title: 'Mapa',
    loadComponent: () => import('@maps/map-screen.component'), // Delete lazyloading
    // component: MapScreenComponent
    children: []
  },
  {
    path: 'zone/:id',
    title: '',
    loadComponent: () => import('@routes/zones/components/zone/zone.component'),
    children: []
  },
  {
    path: '',
    title: '',
    pathMatch: 'full',
    redirectTo: 'table'
  }
];
