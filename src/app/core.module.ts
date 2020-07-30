import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ShoppingService } from './shared/shopping.service';
import { RecipeService } from './shared/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule { }
