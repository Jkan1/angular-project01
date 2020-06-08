import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Apple Pie","This is simple a test.","https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg"),
    new Recipe("Apple Pie","This is simple a test.","https://p1.pxfuel.com/preview/982/923/738/pudding-caramel-pudding-food-recipe-dessert-flan.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
