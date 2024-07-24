import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectModelFeature = (state: AppState) => state.modal;

export const selectDataModal = createSelector(
  selectModelFeature,
  ({ props, isVisible }) => ({ props, isVisible })
);
