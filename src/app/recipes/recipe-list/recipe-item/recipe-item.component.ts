import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { animate, group, style, transition, trigger } from '@angular/animations';


const recipeAnimations = [
  trigger('recipe-list', [
    transition('void => *', [
      style({
        "opacity": 0,
        'transform': "translateY(100px)"
      }),
      animate(500)
    ])
  ])
]

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: recipeAnimations
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input('index') recipeIndex: number;

  constructor() { }

  ngOnInit(): void { }

}
