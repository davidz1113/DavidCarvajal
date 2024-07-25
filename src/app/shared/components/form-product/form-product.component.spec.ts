import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DummyProductValid } from '../../../core/testing/mocks/mocks';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormProductComponent,
        HttpClientModule,
        StoreModule.forRoot({}),
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetForm() should reset the form', () => {
    const spyFormReset = jest.spyOn(component.formProduct, 'reset');
    component.resetForm();
    expect(spyFormReset).toHaveBeenCalled();
  });

  it('onSendForm() should emit the form if the form is valid', () => {
    component.formProduct.patchValue(DummyProductValid);
    const spyFormSubmit = jest.spyOn(component.OnSendForm, 'emit');
    component.onSendForm();
    expect(spyFormSubmit).toHaveBeenCalled();
  });
});
