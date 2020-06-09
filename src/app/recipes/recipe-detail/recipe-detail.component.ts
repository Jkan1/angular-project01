import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent implements OnInit {

  recipeDetails: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.selectReciepe.subscribe(
      (recipe: Recipe)=>{
        this.recipeDetails = recipe;
      }
    )
  }

}
