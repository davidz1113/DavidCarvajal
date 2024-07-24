import { Component } from '@angular/core';
import { FormProductComponent } from '../../../../shared/components/form-product/form-product.component';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormProductComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export default class NewProductComponent {

}
