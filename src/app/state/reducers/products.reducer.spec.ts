import { productReducer, initialState } from './products.reducer';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsByFilter,
  setPageSize,
  createProductLoad,
  createProductLoadSuccess,
  reportFailure,
  editProductData,
  updateProductLoad,
  updateProductLoadSuccess,
  deleteProduct,
  deleteProductSuccess,
} from '../actions/products.actions';
import { DummyProduct } from '../../core/testing/mocks/mocks';

describe('productReducer', () => {
  it('should handle loadProducts action', () => {
    const action = loadProducts();
    const state = productReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.message).toBe('');
    expect(state.productEdit).toBeNull();
    expect(state.filter).toBe('');
    expect(state.idToDelete).toBeNull();
  });

  it('should handle loadProductsSuccess action', () => {
    const products = [DummyProduct];
    const action = loadProductsSuccess({ products });
    const state = productReducer(initialState, action);

    expect(state.products).toEqual(products);
    expect(state.productsFiltered).toEqual(products);
    expect(state.loading).toBe(false);
  });

  it('should handle loadProductsByFilter action', () => {
    const filter = 'test';
    const action = loadProductsByFilter({ filter });
    const state = productReducer(initialState, action);

    expect(state.filter).toBe(filter);
  });

  it('should handle setPageSize action', () => {
    const pageSize = 10;
    const action = setPageSize({ pageSize });
    const state = productReducer(initialState, action);

    expect(state.pageSize).toBe(pageSize);
  });

  it('should handle createProductLoad action', () => {
    const action = createProductLoad({ product: DummyProduct });
    const state = productReducer(initialState, action);

    expect(state.loadCreateProduct).toBe(true);
    expect(state.message).toBe('');
  });

  it('should handle createProductLoadSuccess action', () => {
    const message = 'Product created successfully';
    const action = createProductLoadSuccess({ message });
    const state = productReducer(initialState, action);

    expect(state.loadCreateProduct).toBe(false);
    expect(state.message).toBe(message);
    expect(state.typeAlert).toBe('success');
  });

  it('should handle reportFailure action', () => {
    const message = 'An error occurred';
    const typeAlert = 'error';
    const action = reportFailure({ message, typeAlert });
    const state = productReducer(initialState, action);

    expect(state.message).toBe(message);
    expect(state.typeAlert).toBe(typeAlert);
  });

  it('should handle editProductData action', () => {
    const product = DummyProduct;
    const action = editProductData({ product });
    const state = productReducer(initialState, action);

    expect(state.productEdit).toEqual(product);
  });

  it('should handle updateProductLoad action', () => {
    const action = updateProductLoad({ product: DummyProduct });
    const state = productReducer(initialState, action);

    expect(state.loadUpdateProduct).toBe(true);
    expect(state.message).toBe('');
  });

  it('should handle updateProductLoadSuccess action', () => {
    const message = 'Product updated successfully';
    const action = updateProductLoadSuccess({ message });
    const state = productReducer(initialState, action);

    expect(state.loadUpdateProduct).toBe(false);
    expect(state.message).toBe(message);
    expect(state.typeAlert).toBe('success');
  });

  it('should handle deleteProduct action', () => {
    const id = '1';
    const action = deleteProduct({ id });
    const state = productReducer(initialState, action);

    expect(state.idToDelete).toBe(id);
    expect(state.message).toBe('');
  });

  it('should handle deleteProductSuccess action', () => {
    const id = '1';
    const message = 'Product deleted successfully';
    const action = deleteProductSuccess({ message, id });
    const state = productReducer(initialState, action);

    expect(state.products).toEqual([]);
    expect(state.productsFiltered).toEqual([]);
    expect(state.message).toBe(message);
    expect(state.typeAlert).toBe('success');
  });
});
