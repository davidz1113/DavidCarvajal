import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { ButtonType } from '../../../core/constanst/button.enums';
import { dateIsTodayValidator } from '../../../core/validators/date-is-today.validator';
import { DatePipe, JsonPipe } from '@angular/common';
import { productExistsValidator } from '../../../core/validators/product-exists.validator';
import { ProductsService } from '../../../modules/services/products.service';

@Component({
  selector: 'ui-form-product',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, JsonPipe],
  providers: [DatePipe],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  formProduct: FormGroup = new FormGroup({});
  secondaryType = ButtonType.Secondary;
  private datePipe: DatePipe = inject(DatePipe);
  private productService = inject(ProductsService);

  constructor() {
    this.formProduct = this.fb.group({
      id: [
        '',
        {
          asyncValidators: [productExistsValidator(this.productService)],
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        },
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: [new Date(), [Validators.required, dateIsTodayValidator()]],
      date_revision: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.formProduct.get('date_release')?.valueChanges.subscribe((val) => {
      const dateRelease = new Date(val);
      const dateNextYear = new Date(
        dateRelease.setFullYear(dateRelease.getFullYear() + 1)
      );

      this.formProduct
        .get('date_revision')
        ?.setValue(this.datePipe.transform(dateNextYear, 'dd/MM/yyyy'));
    });
  }

  onSendForm(): void {
    this.formProduct.markAllAsTouched();
    console.log(this.formProduct.value);
  }

  resetForm() {
    this.formProduct.reset();
  }
}
