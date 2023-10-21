import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeListUserComponent } from './recipe-list-user/recipe-list-user.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFloaterComponent } from './recipe-floater/recipe-floater.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeBannerComponent } from './recipe-banner/recipe-banner.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeFloaterComponent,
        RecipeItemComponent,
        RecipeBannerComponent,
        RecipeEditComponent,
        RecipeHomeComponent,
        RecipeListUserComponent
    ],
    imports: [RecipeRoutingModule, SharedModule, ReactiveFormsModule]
})
export class RecipeModule { }