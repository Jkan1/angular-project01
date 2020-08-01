import { Ingredient } from '../shared/ingredient.model';
import { Action } from '@ngrx/store';

const initialState = {
    ingredients: [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 2)
    ]
}

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_ING':
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
    }
}