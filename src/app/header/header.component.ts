import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.style.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    private authSubscription: Subscription;
    isAuthenticated: boolean = false;
    userName: string;
    profileImage: string = environment.sampleProfileImage;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.authSubscription = this.store.select('auth')
            .pipe(
                map((authState) => {
                    return authState.user;
                }))
            .subscribe((user) => {
                this.isAuthenticated = !!user;
                if(user){
                    this.userName = user.displayName;
                    this.profileImage = user.profileImage ? user.profileImage : this.profileImage;
                }
            });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}
