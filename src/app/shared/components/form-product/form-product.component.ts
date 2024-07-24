import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { Store } from '@ngrx/store';
import {
  selectCreateProductLoading,
  selectProductEditLoading,
} from '../../../state/selectors/products.selector';
import { ProductModel } from '../../../core/models/product.interface';
import { Subscription } from 'rxjs';

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
  private store: Store<any> = inject(Store);
  @Output() OnSendForm: EventEmitter<ProductModel> = new EventEmitter();
  @Input() productEdit: ProductModel | null = null;

  subscriptionCreate: Subscription | any;
  subscriptionUpdate: Subscription | any;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    this.subscriptionCreate = this.store
      .select(selectCreateProductLoading)
      .subscribe({
        next: (loading) => {
          if (loading) {
            this.formProduct.disable();
          } else {
            this.formProduct.enable();
            this.formProduct.get('date_revision')?.disable();
          }
        },
      });

   

    this.formProduct.get('date_release')?.valueChanges.subscribe((val) => {
      const dateRelease = new Date(val);
      const dateNextYear = new Date(
        dateRelease.setFullYear(dateRelease.getFullYear() + 1)
      );

      this.formProduct
        .get('date_revision')
        ?.setValue(this.datePipe.transform(dateNextYear, 'yyyy-MM-dd'));
    });

    if (this.productEdit) {
      this.subscriptionCreate.unsubscribe();
      this.updateValuesForm();
    } 
  }

  initForm() {
    this.formProduct = this.fb.group({
      id: [
        '',
        {
          asyncValidators: [productExistsValidator(this.productService)],
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
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

  updateValuesForm(): void {
    this.formProduct.get('id')?.clearAsyncValidators();
    this.formProduct.get('id')?.clearValidators();
    this.formProduct.get('id')?.disable();
    this.formProduct.patchValue(this.productEdit!);
    this.formProduct.updateValueAndValidity();

    this.subscriptionUpdate = this.store
    .select(selectProductEditLoading)
    .subscribe({
      next: (loading) => {
        if (loading) {
          console.log(loading);
          this.formProduct.disable();
          this.formProduct.updateValueAndValidity();
        } else {
          this.formProduct.enable();
          this.formProduct.get('id')?.disable();
          this.formProduct.get('date_revision')?.disable();
        }
      },
    });
  }

  onSendForm(): void {
    this.formProduct.markAllAsTouched();
    if (this.formProduct.invalid || this.formProduct.disabled) {
      return;
    }
    this.OnSendForm.emit(this.formProduct.getRawValue());
  }

  resetForm() {
    this.formProduct.reset();
  }
}
