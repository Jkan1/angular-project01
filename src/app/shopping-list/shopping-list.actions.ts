import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

export const ADD_ING = 'ADD_ING';
export const ADD_ING_MULTI = 'ADD_ING_MULTI';
export const UPDATE_ING = 'UPDATE_ING';
export const DELETE_ING = 'DELETE_ING';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIng implements Action {
    readonly type = ADD_ING;
    constructor(public payload: Ingredient) { }
}

export class AddIngMulti implements Action {
    readonly type = ADD_ING_MULTI;
    constructor(public payload: Ingredient[]) { }
}

export class UpdateIng implements Action {
    readonly type = UPDATE_ING;
    constructor(public payload: Ingredient) { }
}

export class DeleteIng implements Action {
    readonly type = DELETE_ING;
    constructor() { }
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload:number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}


export type ActionTypes =
    | AddIng
    | AddIngMulti
    | UpdateIng
    | DeleteIng
    | StartEdit
    | StopEdit;
