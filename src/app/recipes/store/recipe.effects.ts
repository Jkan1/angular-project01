import { Actions, createEffect, ofType } from '@ngrx/effects';
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

    
    fetchRecipes = createEffect(() => this.action$.pipe(
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
    ));

    
    storeRecipes = createEffect(() => this.action$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionState, recipeState]) => {
            return this.httpClient.put(environment.dataBaseUrl, recipeState.recipes)
        })
    ), { dispatch: false })

    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

}