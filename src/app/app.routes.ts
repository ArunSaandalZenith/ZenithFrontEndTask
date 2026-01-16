import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./domain/vehicles/features/vehicles.routes').then((m) => m.vehiclesRoutes),
  },
];
