import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolver } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { VerifyGuard } from '../auth/verify/verify.guard';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [{
    path: "", component: RecipesComponent,
    canActivate: [AuthGuard, VerifyGuard],
    children: [
        { path: "", component: RecipeListComponent },
        { path: "new", component: RecipeEditComponent },
        { path: ":id", component: RecipeDetailComponent },
        { path: ":id/edit", component: RecipeEditComponent }
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }