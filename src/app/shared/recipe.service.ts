import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable()
export class RecipeService implements OnInit {

    private recipes: Recipe[] = [
        new Recipe("Apple Pie",
            "This is simple a test.",
            "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg",
            [
                new Ingredient('Cashew', 20),
                new Ingredient('Almond', 15)
            ]),
        new Recipe("Banana Pie",
            "This is simple a test.",
            "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg",
            [
                new Ingredient('Papaya', 1),
                new Ingredient('Jam', 5)
            ])
    ];

    selectReciepe = new EventEmitter<Recipe>();

    constructor() { }

    ngOnInit() {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes.slice()[id];
    }

    onRecipeSelected(recipe: Recipe) {
        this.selectReciepe.emit(recipe);
    }

}