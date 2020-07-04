import { Injectable, OnInit } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService implements OnInit {

    recipeEvent = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe("Apple Pie",
    //         "This is simple a test.",
    //         "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg",
    //         [
    //             new Ingredient('Cashew', 20),
    //             new Ingredient('Almond', 15)
    //         ]),
    //     new Recipe("Banana Pie",
    //         "This is simple a test.",
    //         "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg",
    //         [
    //             new Ingredient('Papaya', 1),
    //             new Ingredient('Jam', 5)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    emitRecipes() {
        this.recipeEvent.next(this.recipes.slice());
    }

    constructor() { }

    ngOnInit() {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.emitRecipes();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.emitRecipes();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.emitRecipes();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.emitRecipes();
    }

}