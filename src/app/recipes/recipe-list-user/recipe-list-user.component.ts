import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { FetchRecipes } from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-list-user',
  templateUrl: './recipe-list-user.component.html',
  styleUrls: ['./recipe-list-user.component.css']
})
export class RecipeListUserComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private routerService: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes)
    ).subscribe(
      (recipes: Recipe[]) => {
        if (!recipes || !recipes.length) {
          this.store.dispatch(new FetchRecipes());
        } else {
          this.recipes = recipes;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddRecipe() {
    this.routerService.navigate(['../new'], { relativeTo: this.activeRoute })
  }

}
