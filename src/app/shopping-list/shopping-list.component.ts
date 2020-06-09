import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscribedEvent: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscribedEvent = this.shoppingService.ingredientEvent.subscribe(
      (newIngredients) => {
        this.ingredients = newIngredients;
      }
    )
  }

  ngOnDestroy() {
    this.subscribedEvent.unsubscribe();
  }

}
