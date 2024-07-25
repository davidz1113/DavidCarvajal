import { ComponentFixture, TestBed } from '@angular/core/testing';

import NewProductComponent from './new-product.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppState } from '../../../../state/app.state';
import { DummyProduct } from '../../../../core/testing/mocks/mocks';

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductComponent, StoreModule.forRoot({}), HttpClientModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createProduct() should dispatch createProduct load action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.createProduct(DummyProduct);
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
