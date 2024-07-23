import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../core/models/product.interface';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: ProductModel[] }>()
);

export const loadProductsByFilter = createAction(
  '[Products] Load Products By Filter',
  props<{ filter: string }>()
);

export const setPageSize = createAction(
  '[Products] Set Page Size',
  props<{ pageSize: number }>()
);
