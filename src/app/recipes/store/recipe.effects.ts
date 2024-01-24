import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ADD_RECIPE, FETCH_RECIPES, SetRecipe, STORE_RECIPES, ApiSuccess, ApiError, AddRecipe, FetchRecipes, UPDATE_RECIPE } from './recipe.actions';
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
            if (actionData.userId)
                fetchUrl += '?orderBy="createdBy"&startAt="' + actionData.userId + '"&endAt="' + actionData.userId + '"';
            return this.httpClient.get<Recipe[]>(fetchUrl)
        }),
        map(
            (data) => {
                if (data) {
                    const result = [];
                    for (const key in data) {
                        if (Object.prototype.hasOwnProperty.call(data, key)) {
                            const recipe = data[key];
                            recipe.uid = key;
                            result.push(recipe);
                        }
                    }
                    return result;
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
    ), { dispatch: false });

    addNewRecipe = createEffect(() => this.action$.pipe(
        ofType(ADD_RECIPE),
        switchMap((actionData: AddRecipe) => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.id || !userData._token) return of(this.handleError('Unauthorized'));
            const payloadData = Object.assign({}, actionData.payload);
            payloadData.createdBy = userData.id;
            return this.httpClient.post(environment.dataBaseUrl + '?auth=' + userData?._token, payloadData)
                .pipe(
                    map(() => {
                        return this.handleSuccess(0, {});
                    }),
                    catchError((errorRes) => {
                        return of(this.handleError(errorRes));
                    })
                )
        })
    ), { dispatch: true });

    updateRecipe = createEffect(() => this.action$.pipe(
        ofType(UPDATE_RECIPE),
        switchMap((actionData: AddRecipe) => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.id || !userData._token) return of(this.handleError('Unauthorized'));
            if (!actionData.payload.uid) return of(this.handleError('Error Occurred'));
            const payloadData = Object.assign({}, actionData.payload);
            payloadData.createdBy = userData.id;
            const updateUrl = environment.dataBaseUrl.replace('.json', '/' + actionData.payload.uid + '.json')
            console.log(updateUrl);
            return this.httpClient.get(environment.dataBaseUrl + '?auth=' + userData?._token)//, payloadData)
                .pipe(
                    map(() => {
                        return this.handleSuccess(0, {});
                    }),
                    catchError((errorRes) => {
                        return of(this.handleError(errorRes));
                    })
                )
        })
    ), { dispatch: true });

    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

}