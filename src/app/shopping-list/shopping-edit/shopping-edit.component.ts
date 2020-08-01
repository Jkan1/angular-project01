import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shared/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list.actions';
import { AppState } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) form1: NgForm;

  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editIndex > -1) {
        this.editMode = true;
        // this.editedItemIndex = stateData.editIndex;
        this.editedItem = stateData.editItem;
        this.form1.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingService.startedEditingEvent.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingService.getIng(index);
    //     this.form1.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIng(this.editedItemIndex, newIng);
      this.store.dispatch(new ShoppingListActions.UpdateIng(newIng))
    } else {
      // this.shoppingService.addIngredient(newIng);
      this.store.dispatch(new ShoppingListActions.AddIng(newIng)); 
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.form1.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.shoppingService.deleteIng(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIng());
    this.onClear();
  }
}
