import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { ProductsEffects } from './state/effects/products.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(ROOT_REDUCERS), provideEffects([ProductsEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideHttpClient()]
};
