import { Ingredient } from '../shared/ingredient.model';

import * as ShoppingListAction from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 2)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListAction.ActionTypes) {
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
        default: 
            return state;
    }
}