import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeComponent from './home.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../../../state/app.state';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, StoreModule.forRoot({})],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToNewProduct() should navigate to new product page', () => {
    const routerSpy = jest.spyOn(component.router, 'navigate');
    component.goToNewProduct();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('constructor() should dispatch loadProductsByFilter action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.formData.setValue({ form1: 'test' });
    // component.constructor();
    expect(dispatchSpy).toHaveBeenCalled();
  });

});
