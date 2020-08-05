import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AddIngMulti } from '../../shopping-list/shopping-list.actions';
import { DeleteRecipe } from '../store/recipe.actions';
import { AppState } from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent implements OnInit {

  recipeDetails: Recipe;
  id: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerService: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      map((params: Params) => +params['id']),
      switchMap((id) => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map((recipeState) => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })
    ).subscribe((recipe) => {
      this.recipeDetails = recipe;
    });
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(new AddIngMulti(this.recipeDetails.ingredients));
  }

  onEditRecipe() {
    this.routerService.navigate(['edit'], { relativeTo: this.activeRoute });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.routerService.navigate(['/recipes']);
  }

}
