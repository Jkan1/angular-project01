import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

import { Ingredient } from './ingredient.model';

@Injectable()

export class ShoppingService implements OnInit {

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 2)
    ];

    ingredientEvent = new Subject<Ingredient[]>();
    startedEditingEvent = new Subject<number>();

    constructor() { }

    ngOnInit() { }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientEvent.next(this.ingredients.slice());
    }

    getIng(index: number) {
        return this.ingredients[index];
    }

    updateIng(index: number, newIng: Ingredient) {
        this.ingredients[index] = newIng;
        this.ingredientEvent.next(this.ingredients.slice());
    }

    deleteIng(index:number){
        this.ingredients.splice(index,1);
        this.ingredientEvent.next(this.ingredients.slice());
    }

}