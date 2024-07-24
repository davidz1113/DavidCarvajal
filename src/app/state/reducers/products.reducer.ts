import { createReducer, on } from '@ngrx/store';
import { ProductState } from '../../core/models/product.state';
import {
  createProductLoad,
  createProductLoadSuccess,
  editProductData,
  loadProducts,
  loadProductsByFilter,
  loadProductsSuccess,
  reportFailure,
  setPageSize,
  updateProductLoad,
  updateProductLoadSuccess,
} from '../actions/products.actions';
import { ProductModel } from '../../core/models/product.interface';

export const initialState: ProductState = {
  products: [],
  loading: false,
  filter: '',
  productsFiltered: [],
  pageSize: 5,
  loadCreateProduct: false,
  loadUpdateProduct: false,
  message: '',
  typeAlert: null,
  productEdit: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    message: '',
    productEdit: null,
    filter: '',
  })),
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
  })),
  on(createProductLoad, (state) => ({
    ...state,
    loadCreateProduct: true,
    message: '',
  })),
  on(createProductLoadSuccess, (state, { message }) => ({
    ...state,
    loadCreateProduct: false,
    message,
    typeAlert: 'success',
  })),
  on(reportFailure, (state, { message, typeAlert }) => ({
    ...state,
    message,
    typeAlert,
  })),
  on(editProductData, (state, { product }) => ({
    ...state,
    productEdit: product,
  })),
  on(updateProductLoad, (state) => ({
    ...state,
    loadUpdateProduct: true,
    message: '',
  })),

  on(updateProductLoadSuccess, (state, { message }) => ({
    ...state,
    loadUpdateProduct: false,
    message,
    typeAlert: 'success',
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
