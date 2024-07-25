import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsService } from '../../modules/services/products.service';
import { ProductsEffects } from './products.effects';
import {
  createProductLoad,
  deleteProduct,
  reportFailure,
} from '../actions/products.actions';
import { closeModal } from '../actions/modal.actions';
import { DummyProduct } from '../../core/testing/mocks/mocks';
import { AppState } from '../app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let productsService: ProductsService;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ProductsEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: ProductsService,
          useValue: {
            getProductsApi: jest.fn(),
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(ProductsEffects);
    productsService = TestBed.inject(ProductsService);
  });

  describe('loadProducts$', () => {
    it('should dispatch Load Products Success action with products on success', () => {
      const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      const action = { type: '[Products] Load Products' };
      const expectedAction = {
        type: '[Products] Load Products Success',
        products,
      };

      jest
        .spyOn(productsService, 'getProductsApi')
        .mockReturnValue(of([DummyProduct]));

      actions$ = of(action);

      effects.loadProducts$.subscribe((resultAction) => {
        expect(resultAction).toEqual(expectedAction);
      });
    });

    it('should dispatch Report Failure action on error', () => {
      const error = new Error('Failed to load products');
      const action = { type: '[Products] Load Products' };
      const expectedAction = {
        type: '[Products] Report Failure',
        error,
      };

      jest
        .spyOn(productsService, 'getProductsApi')
        .mockReturnValue(throwError(() => error));

      actions$ = of(action);

      effects.loadProducts$.subscribe((resultAction) => {
        expect(resultAction).toEqual(expectedAction);
      });
    });
  });

  describe('createProduct$', () => {
    it('should dispatch create product action on success', async () => {
      store.dispatch(createProductLoad({ product: DummyProduct }));
      const expectedAction = {
        type: '[Products] Create Product Load Success',
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockReturnValue(of(DummyProduct));

      effects.createProduct$.subscribe((resultAction) => {
        expect(resultAction).toEqual(expectedAction);
      });
    });

    it('should dispatch Report Failure action on error', () => {
      const product = { id: 1, name: 'New Product' };
      const error = new Error('Failed to create product');
      const action = {
        type: '[Products] Create Product Load',
        payload: product,
      };
      const expectedAction = {
        type: '[Products] Report Failure',
        error,
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockReturnValue(throwError(() => error));

      actions$ = of(action);

      effects.createProduct$.subscribe((resultAction) => {
        expect(resultAction).toEqual(expectedAction);
      });
    });

  });

});
