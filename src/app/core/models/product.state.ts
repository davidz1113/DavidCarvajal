import { ProductModel } from './product.interface';

export interface ProductState {
  loading: boolean;
  filter: string;
  products: ReadonlyArray<ProductModel>;
  productsFiltered: ProductModel[];
  pageSize: number;
}
