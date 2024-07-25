import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { AppState } from './state/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState: { modal: { isVisible: true, props: { id: '1' } } },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    destroy$ = new Subject<void>();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component['destroy$'] = destroy$;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('onCancelModal() should set showModal to false', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const nextSpy = jest.spyOn(destroy$, 'next');
    const completeSpy = jest.spyOn(destroy$, 'complete');
    component.onCancelModal();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('onConfirmDelete() should dispatch deleteProduct action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onConfirmDelete();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
