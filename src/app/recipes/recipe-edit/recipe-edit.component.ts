import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {

  id: number;
  editMode: boolean = false
  recipeForm: FormGroup;
  private storeSub: Subscription;

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
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
      // let recipeObj = this.recipeService.getRecipeById(this.id);
      this.storeSub = this.store.select('recipes').pipe(map((recipeState) => {
        return recipeState.recipes.find((recipe,index)=>{
          return index === this.id;
        });
      })).subscribe((recipeObj) => {
        recipeName = recipeObj.name;
        imagePath = recipeObj.imagePath;
        desc = recipeObj.description;
        if ( ['ingredients']) {
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
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'ingredientsArray': recipeIng
    })
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredientsArray']
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(new UpdateRecipe({ index: this.id, recipe: newRecipe }));
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new AddRecipe(newRecipe));
    }
    this.onCancel();
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

  onCancel() {
    // this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  onDeleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredientsArray')).removeAt(index);
  }

}
