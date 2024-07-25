import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { DummyProduct } from '../../core/testing/mocks/mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];

    service.getProductsApi().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should check if a product is valid by ID', () => {
    const mockProductId = '1';

    service.getIsValidProductById(mockProductId).subscribe((isValid) => {
      expect(isValid).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:3002/bp/products/verification/${mockProductId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should create a new product', () => {
    service.createProduct(DummyProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(DummyProduct);
    req.flush({});
  });

  it('should update an existing product', () => {
    service.updateProduct(DummyProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3002/bp/products/${DummyProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(DummyProduct);
    req.flush({});
  });

  it('should delete a product by ID', () => {
    const mockProductId = '1';

    service.deleteProduct(mockProductId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3002/bp/products/${mockProductId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
