import * as ShoppingListReducer from '../shopping-list/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: ShoppingListReducer.State,
    auth: AuthReducer.State
}

export const AppReducer: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.shoppingListReducer,
    auth: AuthReducer.authReducer
}