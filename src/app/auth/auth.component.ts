import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from "./auth.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AppPlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { LoginStart, SignupStart, ClearError } from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    isLoading:boolean = false;
    // error: string = null; 
    @ViewChild(AppPlaceholderDirective) alertHost: AppPlaceholderDirective;

    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(
        private auth: AuthService,
        private router: Router,
        private factory: ComponentFactoryResolver,
        private store: Store<AppState>
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe((authState) => { 
            this.isLoading = authState.loading;
            if (authState.authError)
                this.onShowError(authState.authError);
        });
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        // this.isLoading = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        // let authObs: Observable<AuthResponseData>;
        if (this.isLoginMode) {
            // authObs = this.auth.login(email, password);
            this.store.dispatch(new LoginStart({ email, password }))
        } else {
            // authObs = this.auth.signup(email, password);
            this.store.dispatch(new SignupStart({ email, password }));
        }

        this.store.select('auth').subscribe((authState)=>{

        });

        // authObs.subscribe(
        //     (res) => {
        //         console.log(res);
        //         this.isLoading = false;
        //         this.router.navigate(['/recipes']);
        //     },
        //     (err) => {
        //         // this.error = err;
        //         this.onShowError(err);
        //         this.isLoading = false;
        //     }
        // );
        authForm.reset();
    }

    // onCloseDialog(){
    //     this.error = null;
    // }

    onShowError(errorMessage) {
        const alertComponentFactory = this.factory.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        alertComponentRef.instance.message = errorMessage;
        this.closeSub = alertComponentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear(); 
            this.store.dispatch(new ClearError());
        });
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

}