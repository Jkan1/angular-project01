import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

export const ADD_ING = 'ADD_ING';
export const ADD_ING_MULTI = 'ADD_ING_MULTI';

export class AddIng implements Action {
    readonly type = ADD_ING;
    constructor(public payload: Ingredient) { }
}

export class AddIngMulti implements Action {
    readonly type = ADD_ING_MULTI;
    constructor(public payload: Ingredient[]) { }
}

export type ActionTypes = AddIng | AddIngMulti;
