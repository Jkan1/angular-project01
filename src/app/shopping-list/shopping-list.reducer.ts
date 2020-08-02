import { Ingredient } from '../shared/ingredient.model';

import * as ShoppingListAction from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editItem: Ingredient;
    editIndex: number;
}

// export interface AppState {
//     shoppingList: State;
// }

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 2)
    ],
    editItem: null,
    editIndex: -1
}

export function shoppingListReducer(state: State = initialState, action: ShoppingListAction.ActionTypes) {
    switch (action.type) {
        case ShoppingListAction.ADD_ING:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListAction.ADD_ING_MULTI:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListAction.UPDATE_ING:
            const existingIng = state.ingredients[state.editIndex];
            const updatedIng = {
                ...existingIng,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editIndex] = updatedIng;
            return {
                ...state,
                ingredients: updatedIngredients,
                editIndex: -1,
                editItem: null
            };
        case ShoppingListAction.DELETE_ING:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== state.editIndex;
                }),
                editIndex: -1,
                editItem: null
            };
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editIndex: action.payload,
                editItem: { ...state.ingredients[action.payload] }
            };
        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                editIndex: -1,
                editItem: null
            };
        default:
            return state;
    }
}
