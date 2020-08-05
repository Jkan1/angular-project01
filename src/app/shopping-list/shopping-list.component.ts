import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
