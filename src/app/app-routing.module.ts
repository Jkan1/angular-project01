import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './auth/user/user.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { AboutUsComponent } from './aboutus/aboutus.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent
    },
    {
        path: 'verify/_/auth/valid',
        component: VerifyComponent
    },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipe.module').then((m) => m.RecipeModule)
    },
    {
        path: 'aboutus',
        component: AboutUsComponent
    },
    {
        path: 'shopping',
        loadChildren: () => import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
