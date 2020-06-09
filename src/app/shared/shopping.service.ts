import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Ingredient } from './ingredient.model';

@Injectable()

export class ShoppingService implements OnInit {

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 2)
    ];

    ingredientEvent = new EventEmitter<Ingredient[]>();

    constructor() { }

    ngOnInit() { }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientEvent.emit(this.ingredients.slice());
    }


}