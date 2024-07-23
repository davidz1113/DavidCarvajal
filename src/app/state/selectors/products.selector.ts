import { state } from '@angular/animations';
import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectProductsFeature = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductsFeature,
  (state) => state.productsFiltered
);

export const selectProductsLength = createSelector(
  selectProducts,
  (products) => products.length
);

export const selectProductsLoading = createSelector(
  selectProductsFeature,
  (state) => state.loading
);
