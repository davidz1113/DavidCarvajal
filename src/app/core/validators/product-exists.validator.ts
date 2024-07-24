import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ProductsService } from '../../modules/services/products.service';
import {
  catchError,
  debounceTime,
  delay,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

export function productExistsValidator(
  productService: ProductsService | null
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (
      control.value === null ||
      control.value === '' ||
      control.value.length < 3 ||
      control.value.length > 10
    ) {
      return of(null);
    }

    return of(control.value).pipe(
      delay(2000),
      switchMap((value) => productService!.getIsValidProductById(value)),
      map((exits) => {
        console.log(exits);
        return !exits ? null : { productExists: true };
      }),
      catchError(() => of({ unknowError: true }))
    );

    // return productService.getIsValidProductById(control.value).pipe(
    //   map((exits) => {
    //     return !exits ? null : { productExists: true };
    //   })
    // );
  };
}
