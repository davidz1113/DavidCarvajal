import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../modules/services/products.service';
import { catchError, concatMap, EMPTY, map, mergeMap, of } from 'rxjs';
import { deleteProduct, reportFailure } from '../actions/products.actions';
import { closeModal } from '../actions/modal.actions';

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
            return of(
              reportFailure({ message: err.message, typeAlert: 'error' })
            );
          })
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Products] Create Product Load'),
      mergeMap((action: any) => {
        // console.log('action', action)
        return this.productsService.createProduct(action.product).pipe(
          map(({ message }) => ({
            type: '[Products] Create Product Load Success',
            message,
          })),
          catchError((err) => {
            return of(
              reportFailure({ message: err.message, typeAlert: 'error' })
            );
          })
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Products] Update Product Load'),
      mergeMap((action: any) => {
        return this.productsService.updateProduct(action.product).pipe(
          map(({ message }) => ({
            type: '[Products] Update Product Load Success',
            message,
          })),
          catchError((err) => {
            return of(
              reportFailure({ message: err.message, typeAlert: 'error' })
            );
          })
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Products] Delete Product'),
      mergeMap((action: any) => {
        return this.productsService.deleteProduct(action.id).pipe(
          concatMap(({ message }) => [
            {
              type: '[Products] Delete Product Success',
              message,
              id: action.id,
            },
            closeModal(),
          ]),
          catchError((err) => {
            return of(
              reportFailure({ message: err.message, typeAlert: 'error' })
            );
          })
        );
      })
    )
  );
}
