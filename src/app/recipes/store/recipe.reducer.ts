import { Recipe } from '../recipe.model';
import { RecipeActions, SET_RECIPE, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipe.actions';

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case SET_RECIPE:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case UPDATE_RECIPE:
            const updateRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };
            const newRecipes = [...state.recipes];
            newRecipes[action.payload.index] = updateRecipe; 
            return {
                ...state,
                recipes: newRecipes
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipes, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}