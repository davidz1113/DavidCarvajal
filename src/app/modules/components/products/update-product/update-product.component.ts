import { Component, inject, OnInit } from '@angular/core';
import { FormProductComponent } from '../../../../shared/components/form-product/form-product.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { selectProductEdit } from '../../../../state/selectors/products.selector';
import { ProductModel } from '../../../../core/models/product.interface';
import { updateProductLoad } from '../../../../state/actions/products.actions';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormProductComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export default class UpdateProductComponent implements OnInit {
  store: Store<AppState> = inject(Store);
  producEdit: ProductModel | null = null;

  constructor() {}

  ngOnInit(): void {
    this.store.select(selectProductEdit).subscribe({
      next: (product) => {
        if (product) {
          this.producEdit = product;
        }
      },
    });
  }

  updateProduct(product: ProductModel) {
    this.store.dispatch(updateProductLoad({ product }));
  }
}
