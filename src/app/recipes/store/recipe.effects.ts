import { Actions, Effect, ofType } from '@ngrx/effects';
import { FETCH_RECIPES, SetRecipe, STORE_RECIPES } from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType(FETCH_RECIPES),
        switchMap(() => {
            return this.httpClient.get<Recipe[]>(environment.dataBaseUrl)
        }),
        map(
            (data) => {
                if (data) {
                    return data.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients || [] }
                    });
                }
                return [];
            }
        ),
        map((recipes) => {
            return new SetRecipe(recipes);
        })
    );

    @Effect({ dispatch: false })
    storeRecipes = this.action$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionState, recipeState]) => {
            return this.httpClient.put(environment.dataBaseUrl, recipeState.recipes)
        })
    )

    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

}