import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AppPlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode: boolean = true;
    isLoading:boolean = false;
    // error: string = null; 
    @ViewChild(AppPlaceholderDirective) alertHost: AppPlaceholderDirective;

    private closeSub: Subscription;


    constructor(private auth: AuthService, private router: Router, private factory: ComponentFactoryResolver) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        this.isLoading = true;
        const email = authForm.value.email;
        const password = authForm.value.password;
        let authObs: Observable<AuthResponseData>;
        if (this.isLoginMode) {
            authObs = this.auth.login(email, password);
        } else {
            authObs = this.auth.signup(email, password);
        }
        authObs.subscribe(
            (res) => {
                console.log(res);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            (err) => {
                // this.error = err;
                this.onShowError(err);
                this.isLoading = false;
            }
        );
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
        });
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

}