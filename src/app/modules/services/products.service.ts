import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { ProductModel } from '../../core/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'http://localhost:3002';

  constructor() {}

  getProductsApi(): Observable<ProductModel[]> {
    return this.http.get<any>(`${this.url}/bp/products`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  getIsValidProductById(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/bp/products/verification/${id}`);
  }

  createProduct(product: ProductModel): Observable<any> {
    //the delay to simulate more time to load
    return this.http
      .post<any>(`${this.url}/bp/products`, product)
      .pipe(delay(2000));
  }

  updateProduct(product: ProductModel): Observable<any> {
    //the delay to simulate more time to load
    return this.http
      .put<any>(`${this.url}/bp/products/${product.id}`, product)
      .pipe(delay(2000));
  }

  deleteProduct(id: string): Observable<any> {
    //the delay to simulate more time to load
    return this.http
      .delete<any>(`${this.url}/bp/products/${id}`)
      .pipe(delay(2000));
  }
}
