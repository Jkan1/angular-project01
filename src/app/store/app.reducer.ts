import * as ShoppingListReducer from '../shopping-list/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';
import * as RecipeReducer from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: ShoppingListReducer.State,
    auth: AuthReducer.State,
    recipes: RecipeReducer.State
}

export const AppReducer: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.shoppingListReducer,
    auth: AuthReducer.authReducer,
    recipes: RecipeReducer.recipeReducer
}