import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Tree Tracking',
    loadComponent: () => import('@routes/home/home-page.component'),
  },
  {
    path: 'auth',
    title: 'Unete a nosotros',
    loadComponent: () => import('@routes/auth/layaout.component'),
    loadChildren: () => import('@routes/auth/auth.routes')
  },
  // TODO: rutas con CanActived
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
    loadComponent: () => import('@maps/map-screen.component'),
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
    redirectTo: 'home'
  },
  {
    path: '**',
    title: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
