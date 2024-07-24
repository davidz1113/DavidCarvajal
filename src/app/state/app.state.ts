import { ActionReducerMap } from "@ngrx/store";
import { ProductState } from "../core/models/product.state";
import { productReducer } from "./reducers/products.reducer";
import { ModalState } from "../core/models/modal.state";
import { modalReducer } from "./reducers/modal.reducer";

export interface AppState {
    products: ProductState;
    modal: ModalState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productReducer,
    modal: modalReducer,
};