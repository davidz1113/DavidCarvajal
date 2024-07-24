import { createReducer, on } from '@ngrx/store';
import { ModalState } from '../../core/models/modal.state';
import { closeModal, openModal } from '../actions/modal.actions';

export const initialState: ModalState = {
  isVisible: false,
  props: null,
};

export const modalReducer = createReducer(
  initialState,
  on(openModal, (state, { props }) => ({ ...state, isVisible: true, props })),
  on(closeModal, (state) => ({ ...state, isVisible: false }))
);
