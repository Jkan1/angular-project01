import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class RecipeService implements OnInit {

    private recipes: Recipe[] = [
        new Recipe("Apple Pie", "This is simple a test.", "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg"),
        new Recipe("Banana Pie", "This is simple a test.", "https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg")
    ];

    selectReciepe = new EventEmitter<Recipe>();

    constructor() {

    }

    ngOnInit() {

    }

    getRecipes(){
        return this.recipes.slice();
    }

    onRecipeSelected(recipe: Recipe) {
        this.selectReciepe.emit(recipe);
    }

}