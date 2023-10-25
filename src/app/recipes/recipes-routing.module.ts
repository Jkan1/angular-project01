import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolver } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { VerifyGuard } from '../auth/verify/verify.guard';
import { RecipeListUserComponent } from './recipe-list-user/recipe-list-user.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';

const routes: Routes = [{
    path: "", component: RecipesComponent,
    children: [
        { path: "", component: RecipeHomeComponent },
        { path: "myrecipes", component: RecipeListUserComponent, canActivate: [AuthGuard, VerifyGuard] },
        { path: "new", component: RecipeEditComponent, canActivate: [AuthGuard, VerifyGuard] },
        { path: ":id", component: RecipeDetailComponent },
        { path: ":id/edit", component: RecipeEditComponent, canActivate: [AuthGuard, VerifyGuard] }
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }