import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectMessageAndType } from './state/selectors/products.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-test';
  private store: Store<AppState> = inject(Store);
  messageAndType$: Observable<any> = new Observable();

  ngOnInit(): void {
    this.messageAndType$ = this.store.select(selectMessageAndType);
  }
}
