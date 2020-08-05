import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { FetchRecipes, SET_RECIPE } from './store/recipe.actions';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[]> {

    constructor(
        private store: Store<AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map((recipesState => {
                return recipesState.recipes;
            })),
            switchMap((recipes) => {
                if (recipes.length === 0) {
                    this.store.dispatch(new FetchRecipes());
                    return this.actions$.pipe(
                        ofType(SET_RECIPE),
                        take(1)
                    );
                }
                return of(recipes);
            })
        );
    }
}
