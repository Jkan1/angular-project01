import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators } from '@angular/forms';
import { Recipe, RecipeImage } from '../recipe.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AppPlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../../shared/alert/alert.component';


const animations = [
  trigger('recipe-edit', [
    state('normal', style({
      "opacity": 1,
      'transform': "translateX(0)"
    })),
    transition('* <=> *', [
      style({
        "opacity": 0,
        'transform': "translateX(-100px)"
      }),
      animate(500)
    ])
  ])
]

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: animations
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean = false
  isLoading: boolean = false
  recipeForm: UntypedFormGroup;
  private storeSub: Subscription;
  private closeSub: Subscription;
  public previewFiles: Array<any> = [];
  @ViewChild(AppPlaceholderDirective) alertHost: AppPlaceholderDirective;


  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

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
    let steps = '';
    let desc = '';
    let level = '';
    let duration = '';
    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(map((recipeState) => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe((recipeObj) => {
        recipeName = recipeObj.name;
        desc = recipeObj.description;
      });
    }

    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'desc': new UntypedFormControl(desc),
      'steps': new UntypedFormControl(steps, Validators.required),
      'level': new UntypedFormControl(level, Validators.required),
      'duration': new UntypedFormControl(duration),
      'images': new UntypedFormControl([''])
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.recipeForm.disable();
    console.log(this.recipeForm);
    const images = this.previewFiles.map<RecipeImage>(item => ({
      filename: '',
      src: item.src,
      width: item.width,
      height: item.height
    }));
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['steps'],
      this.recipeForm.value['level'],
      this.recipeForm.value['duration'],
      images
    );
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({ index: this.id, recipe: newRecipe }));
    } else {
      this.store.dispatch(new AddRecipe(newRecipe));
    }
    if (this.storeSub) this.storeSub.unsubscribe();
    this.storeSub = this.store.select('recipes').subscribe((recipeState) => {
      if (!recipeState.loading) {
        this.isLoading = false;
        if (recipeState.apiError) {
          this.onShowError(recipeState.apiError);
          this.recipeForm.enable();
        } else {
          this.onShowError('Success!');
          setTimeout(() => {
            this.router.navigate(['../myrecipes'], { relativeTo: this.activeRoute });
          }, 3000);
        }
      }
    });
  }

  get getRecipeIngControls() {
    return (<UntypedFormArray>this.recipeForm.get('ingredientsArray')).controls;
  }

  onAddIng() {
    (<UntypedFormArray>this.recipeForm.get('ingredientsArray')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(null, Validators.required),
        'amount': new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  onDeleteIng(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredientsArray')).removeAt(index);
  }

  onSelectFile(event) {
    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        file.src = event.target.result.toString();
        const imageFile = new Image();
        imageFile.src = file.src;
        imageFile.onload = () => {
          file.width = imageFile.width;
          file.height = imageFile.height;
          console.log(imageFile.width, imageFile.height);
        };
        this.previewFiles.push(file);
      }
    }
    event.target.value = '';
  }

  onImageRemove(imageIndex) {
    this.previewFiles.splice(imageIndex, 1);
  }

  onShowError(errorMessage) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = errorMessage;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
