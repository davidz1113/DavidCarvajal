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

export const createProductLoad = createAction(
  '[Products] Create Product Load',
  props<{ product: ProductModel }>()
);

export const createProductLoadSuccess = createAction(
  '[Products] Create Product Load Success',
  props<{ message: string }>()
);

export const editProductData = createAction(
  '[Products] Edit Product Data',
  props<{ product: ProductModel }>()
);

export const updateProductLoad = createAction(
  '[Products] Update Product Load',
  props<{ product: ProductModel }>()
);

export const updateProductLoadSuccess = createAction(
  '[Products] Update Product Load Success',
  props<{ message: string }>()
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: string; message: string }>()
);

//Action to handle global exceptions
export const reportFailure = createAction(
  '[Products] Report Failure',
  props<{ message: string; typeAlert: string }>()
);
