import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./modules/components/home/home.component'),
  },
  {
    path: 'product/new',
    loadComponent: () =>
      import('./modules/components/products/new-product/new-product.component'),
  },
];
