import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>; // Ingredient[];
  // private subscribedEvent: Subscription;

  constructor(private shoppingService: ShoppingService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingService.getIngredients();
    // this.subscribedEvent = this.shoppingService.ingredientEvent.subscribe(
    //   (newIngredients) => {
    //     this.ingredients = newIngredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditingEvent.next(index);
  }

  ngOnDestroy() {
    // this.subscribedEvent.unsubscribe();
  }

}
