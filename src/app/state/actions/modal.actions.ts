import { createAction, props } from '@ngrx/store';

export const openModal = createAction(
  '[Modal] Open Modal',
  props<{ props: any }>()
);
export const closeModal = createAction('[Modal] Close Modal');
