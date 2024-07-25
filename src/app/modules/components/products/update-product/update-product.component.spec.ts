import { ComponentFixture, TestBed } from '@angular/core/testing';

import UpdateProductComponent from './update-product.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppState } from '../../../../state/app.state';
import { DummyProduct } from '../../../../core/testing/mocks/mocks';
import { editProductData } from '../../../../state/actions/products.actions';
import { selectProductEdit } from '../../../../state/selectors/products.selector';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UpdateProductComponent,
        StoreModule.forRoot({}),
        HttpClientModule,
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectProductEdit, value: DummyProduct }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateProduct() should dispatch updateProduct load action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.updateProduct(DummyProduct);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('OnInit() when the product edit is dispached', () => {
    store.dispatch(editProductData({ product: DummyProduct }));

    expect(component.producEdit).toEqual(DummyProduct);
  });
});
