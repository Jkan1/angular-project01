import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.style.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    private authSubscription: Subscription;
    isAuthenticated: boolean = false;

    constructor(private store: Store<AppState>) { }

    ngOnInit() { 
        this.authSubscription = this.store.select('auth')
            .pipe(
                map((authState) => {
                    return authState.user;
                }))
            .subscribe((user) => {
                this.isAuthenticated = !!user;
            });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }

    onSaveRecipe() {
        this.store.dispatch(new StoreRecipes());
    }

    onFetchRecipe() {
        this.store.dispatch(new FetchRecipes());
    }
}
