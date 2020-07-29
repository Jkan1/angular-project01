import { Component, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy {

    private authSubscription: Subscription;
    isAuthenticated: boolean = false;

    constructor(private dataService: DataStorageService, private authService: AuthService, private router: Router) { }

    // @Output() pageChanged = new EventEmitter<string>();

    ngOnInit(){
        this.authSubscription = this.authService.user.subscribe((user)=>{
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(){
        this.authSubscription.unsubscribe();
    }

    changePage(slug: string) {
        // this.pageChanged.emit(slug);
    }

    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

    onSaveRecipe() {
        this.dataService.storeRecipes();
    }

    onFetchRecipe() {
        this.dataService.fetchRecipes()
            .subscribe(
                (res) => {
                    console.log(res);
                }
            );;
    }
}