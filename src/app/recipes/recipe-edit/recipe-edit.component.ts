import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls:['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    let recipeIng = new FormArray([]);

    if (this.editMode) {
      let recipeObj = this.recipeService.getRecipeById(this.id);
      recipeName = recipeObj.name;
      imagePath = recipeObj.imagePath;
      desc = recipeObj.description;
      if (recipeObj['ingredients']) {
        for (let ing of recipeObj.ingredients) {
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'ingredientsArray': recipeIng
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  get getRecipeIngControls() {
    return (<FormArray>this.recipeForm.get('ingredientsArray')).controls;
  }

  onAddIng() {
    (<FormArray>this.recipeForm.get('ingredientsArray')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

}
