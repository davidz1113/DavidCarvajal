import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLength,
} from '../../../state/selectors/products.selector';
import { AsyncPipe } from '@angular/common';
import { ProductModel } from '../../../core/models/product.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { setPageSize } from '../../../state/actions/products.actions';

@Component({
  selector: 'ui-table-products',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss',
})
export class TableProductsComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  products$: Observable<readonly ProductModel[]> = new Observable();
  productsLenght$: Observable<number> = new Observable();
  showDropdownIndex: number | null = null;

  selectZiseForm: FormControl = new FormControl('5');

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.productsLenght$ = this.store.select(selectProductsLength);

    this.selectZiseForm.valueChanges.subscribe((value) => {
      this.store.dispatch(setPageSize({ pageSize: value }));
    });
  }

  toggleDropdown(index: number): void {
    this.showDropdownIndex = this.showDropdownIndex === index ? null : index;
  }
}