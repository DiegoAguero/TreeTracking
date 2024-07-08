import { Routes } from '@angular/router';
import { authGuard } from '@guard/auth.guard';


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
    loadChildren: () => import('@routes/auth/auth.routes'),
  },
  {
    path: 'table',
    title: 'Tabla',
    loadComponent: () => import('@routes/zones/components/table/table.component'),
    children: [],
    canActivate: [ authGuard ]
  },
  {
    path: 'map',
    title: 'Mapa',
    loadComponent: () => import('@maps/map-screen.component'),
    children: [],
    canActivate: [ authGuard ]
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
