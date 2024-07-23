import { ActionReducerMap } from "@ngrx/store";
import { ProductState } from "../core/models/product.state";
import { productReducer } from "./reducers/products.reducer";

export interface AppState {
    products: ProductState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productReducer
};