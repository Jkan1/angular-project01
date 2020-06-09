import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingService } from 'src/app/shared/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent implements OnInit {

  recipeDetails: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private activeRoute: ActivatedRoute,
    private routerService: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetails = this.recipeService.getRecipeById(this.id);
      }
    )
  }

  addIngredientsToShoppingList() {
    this.recipeDetails.ingredients.forEach((ing) => {
      this.shoppingService.addIngredient(ing);
    });
  }

  onEditRecipe() {
    // this.routerService.navigate(['../', this.id, 'edit'], { relativeTo: this.activeRoute });
    this.routerService.navigate(['edit'], { relativeTo: this.activeRoute });
  }

}
