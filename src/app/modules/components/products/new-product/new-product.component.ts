import { Component, inject } from '@angular/core';
import { FormProductComponent } from '../../../../shared/components/form-product/form-product.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { ProductModel } from '../../../../core/models/product.interface';
import { createProductLoad } from '../../../../state/actions/products.actions';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormProductComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export default class NewProductComponent {
  private store: Store<AppState> = inject(Store);

  

  createProduct(event: ProductModel) {
    this.store.dispatch(createProductLoad({ product: event }));
  }
}
