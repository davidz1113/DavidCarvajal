import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
}
