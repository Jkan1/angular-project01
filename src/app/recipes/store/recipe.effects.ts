import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ADD_RECIPE, FETCH_RECIPES, SetRecipe, STORE_RECIPES, ApiSuccess, ApiError, AddRecipe, FetchRecipes } from './recipe.actions';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Injectable()
export class RecipeEffects {

    private handleSuccess = (recipeId, payload) => {
        return new ApiSuccess({
            recipeId: recipeId,
            payload: payload
        });
    }

    private handleError = (errorRes) => {
        console.log(errorRes);
        let eMessage = errorRes?.error?.error || "An Unknown Error Occured";
        return new ApiError(eMessage);
    }

    fetchRecipes = createEffect(() => this.action$.pipe(
        ofType(FETCH_RECIPES),
        switchMap((actionData: FetchRecipes) => {
            let fetchUrl = environment.dataBaseUrl;
            if(actionData.userId)
                fetchUrl += '?orderBy="createdBy"&startAt="' + actionData.userId + '"&endAt="' + actionData.userId + '"';
            return this.httpClient.get<Recipe[]>(fetchUrl)
        }),
        map(
            (data) => {
                console.log('data', data);
                if (data) {
                    return Object.values(data).map(recipe => {
                        return { ...recipe, ingredients: [] }
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

    addNewRecipe = createEffect(() => this.action$.pipe(
        ofType(ADD_RECIPE),
        switchMap((actionData: AddRecipe) => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData._token) return of(this.handleError('Unauthorized'));
            return this.httpClient.post(environment.dataBaseUrl + '?auth=' + userData?._token, actionData.payload)
                .pipe(
                    map(() => {
                        return this.handleSuccess(0, {});
                    }),
                    catchError((errorRes) => {
                        return of(this.handleError(errorRes));
                    })
                )
        })
    ), { dispatch: true })

    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

}