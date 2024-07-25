import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectMessageAndType } from './state/selectors/products.selector';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ButtonType } from './core/constanst/button.enums';
import { closeModal } from './state/actions/modal.actions';
import { deleteProduct } from './state/actions/products.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    AlertComponent,
    ModalComponent,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store);
  messageAndType$: Observable<any> = new Observable();
  secondaryType = ButtonType.Secondary;

  isModalVisible$: Observable<boolean> = new Observable();
  props$: Observable<any> = new Observable();

  private destroy$ = new Subject<void>();
  idToDelete: string = '';

  ngOnInit(): void {
    this.messageAndType$ = this.store.select(selectMessageAndType);

    this.isModalVisible$ = this.store.select((state) => state.modal.isVisible);
    this.props$ = this.store.select((state) => state.modal.props);

    this.props$.pipe(takeUntil(this.destroy$)).subscribe((props) => {
      this.idToDelete = props?.id;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancelModal() {
    this.store.dispatch(closeModal());
    this.destroy$.next();
    this.destroy$.complete();
  }

  onConfirmDelete() {
    this.store.dispatch(deleteProduct({ id: this.idToDelete }));
  }
}
