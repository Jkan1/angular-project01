import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[Recipes] SET_RECIPE';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[Recipes] STORE_RECIPE';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const API_SUCCESS = '[Recipes] API_SUCCESS';
export const API_ERROR = '[Recipes] API_ERROR';

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
    constructor(public userId?: string) { }
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: { uid: string, recipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) { }
}

export class ApiSuccess implements Action {
    readonly type = API_SUCCESS;
    constructor(public payload: any) { }
}

export class ApiError implements Action {
    readonly type = API_ERROR;
    constructor(public payload: any) { }
}

export type RecipeActions = SetRecipe | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipes | ApiSuccess | ApiError;