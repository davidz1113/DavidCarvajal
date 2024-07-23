import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../modules/services/products.service';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';

@Injectable()
export class ProductsEffects {
  private action$: Actions = inject(Actions);
  private productsService: ProductsService = inject(ProductsService);

  constructor() {}

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Products] Load Products'),
      mergeMap(() =>
        this.productsService.getProductsApi().pipe(
          map((products) => ({
            type: '[Products] Load Products Success',
            products,
          })),
          catchError((err) => {
            console.log('error obteniendo', err);
            return EMPTY;
          })
        )
      )
    )
  );
}
