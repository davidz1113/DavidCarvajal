import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TableProductsComponent } from '../../../shared/components/table-products/table-products.component';
import { Store } from '@ngrx/store';
import {
  loadProducts,
  loadProductsByFilter,
} from '../../../state/actions/products.actions';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectProductsLoading } from '../../../state/selectors/products.selector';
import { TextSkeletonComponent } from '../../../shared/components/skeletons/text-skeleton/text-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    TableProductsComponent,
    ButtonComponent,
    TextSkeletonComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  private store: Store<any> = inject(Store);
  router: Router = inject(Router);

  productsLoad$: Observable<boolean> = new Observable();


  formData: FormGroup = new FormGroup({});

  constructor() {
    this.formData = this.formBuilder.group({
      form1: [''],
    });

    this.formData.valueChanges.subscribe(({ form1 }) => {
      console.log(form1);
      this.store.dispatch(loadProductsByFilter({ filter: form1 }));
    });
  }

  ngOnInit(): void {
    this.productsLoad$ = this.store.select(selectProductsLoading);
    this.store.dispatch(loadProducts());
  }

  goToNewProduct(): void {
    this.router.navigate(['product/new']);
  }
}
