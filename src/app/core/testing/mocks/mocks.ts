import { NgControl } from '@angular/forms';
import { ProductModel } from '../../models/product.interface';

export class MockNgControl extends NgControl {
  control = null;
  viewToModelUpdate() {}
}

export const StoreMock = {
  dispatch: jest.fn(),
};

export const DummyProduct: ProductModel = {
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  logo: 'Logo 1',
  date_release: '2021-01-01',
  date_revision: '2021-01-01',
};

export const DummyProductValid: ProductModel = {
  id: 'unoid2',
  name: 'Product 1',
  description: 'Description 1larga',
  logo: 'Logo 1',
  date_release: '2021-01-01',
  date_revision: '2021-01-01',
};
