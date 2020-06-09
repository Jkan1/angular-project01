import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input('index') recipeIndex: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  thisRecipeSelected() {
    this.recipeService.selectReciepe.emit(this.recipe);
  }

}
