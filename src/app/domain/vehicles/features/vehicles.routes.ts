import { Routes } from '@angular/router';

export const vehiclesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search').then((m) => m.Search),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./vehicle-details/vehicle-details').then((m) => m.VehicleDetails),
  },
];
