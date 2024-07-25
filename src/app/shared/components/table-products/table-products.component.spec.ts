import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsComponent } from './table-products.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../state/app.state';
import { Router } from '@angular/router';
import { DummyProduct } from '../../../core/testing/mocks/mocks';

describe('TableProductsComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductsComponent, StoreModule.forRoot({})],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleDropdown() should toggle dropdown by index', () => {
    component.toggleDropdown(1);
    expect(component.showDropdownIndex).toEqual(1);
  });

  it('editProduct() should dispatch editProduct action and navigate', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(component.router, 'navigate');
    component.editProduct(DummyProduct);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['product/update']);
  });

  it('deleteProduct() should dispatch openModal action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.deleteProduct(DummyProduct);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('ngOnInit() should dispatch setPageSize if the form of size change', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.selectZiseForm.setValue({ size: 10 });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
