import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsComponent } from './table-products.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('TableProductsComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductsComponent, StoreModule.forRoot({})],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
