import { ProductModel } from './product.interface';

export interface ProductState {
  loading: boolean;
  filter: string;
  products: ReadonlyArray<ProductModel>;
  productsFiltered: ProductModel[];
  pageSize: number;
  loadCreateProduct: boolean;
  loadUpdateProduct: boolean;
  message: string;
  typeAlert: string | null;
  productEdit: ProductModel | null;
  idToDelete: string | null;
}
