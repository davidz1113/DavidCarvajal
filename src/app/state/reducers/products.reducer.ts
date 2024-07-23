import { createReducer, on } from '@ngrx/store';
import { ProductState } from '../../core/models/product.state';
import {
  loadProducts,
  loadProductsByFilter,
  loadProductsSuccess,
  setPageSize,
} from '../actions/products.actions';
import { ProductModel } from '../../core/models/product.interface';

export const initialState: ProductState = {
  products: [],
  loading: false,
  filter: '',
  productsFiltered: [],
  pageSize: 5,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    productsFiltered: filterProducts(products, state.filter, state.pageSize),
    loading: false,
  })),
  on(loadProductsByFilter, (state, { filter }) => ({
    ...state,
    filter,
    productsFiltered: filterProducts(state.products, filter, state.pageSize),
  })),
  on(setPageSize, (state, { pageSize }) => ({
    ...state,
    pageSize,
    productsFiltered: filterProducts(state.products, state.filter, pageSize),
  }))
);

const filterProducts = (
  products: ReadonlyArray<ProductModel>,
  filter: string,
  pageSize: number
): ProductModel[] => {
  return products
    .filter((product) => {
      return product.name.toLowerCase().includes(filter.toLowerCase());
    })
    .slice(0, pageSize);
};
