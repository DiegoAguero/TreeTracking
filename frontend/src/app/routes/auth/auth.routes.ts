
import { Routes } from '@angular/router';

const routesAuth: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@routes/auth/login/login.component'),
    children: []
  },
  {
    path: 'register',
    loadComponent: () => import('@routes/auth/login/login.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


export default routesAuth;
