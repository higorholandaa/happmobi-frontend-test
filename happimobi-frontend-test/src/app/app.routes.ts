import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cars/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'filters',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cars/pages/filters/filters.component').then((m) => m.FiltersComponent),
  },
  { path: '**', redirectTo: 'login' },
];
