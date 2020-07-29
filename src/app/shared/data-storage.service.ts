import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';
// import { Recipe } from "../recipes/recipe.model";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put('https://recipe-d6253.firebaseio.com/recipes.json', recipes).subscribe(
            (res) => {
                console.log(res);
            }
        );
    }

    fetchRecipes() {
        return this.httpClient.get<Recipe[]>(
            'https://recipe-d6253.firebaseio.com/recipes.json')
            .pipe(
                map(
                    (data) => {
                        return data.map(recipe => {
                            return { ...recipe, ingredients: recipe.ingredients || [] }
                        })
                    }
                ),
                tap(
                    (res) => {
                        this.recipeService.setRecipes(res);
                    }
                )
            );
    }
}