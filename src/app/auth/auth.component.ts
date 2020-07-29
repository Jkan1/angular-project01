import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = true;
    isLoading:boolean = false;
    error: string = null; 


    constructor(private auth: AuthService, private router: Router) { }

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
                this.error = err;
                this.isLoading = false;
            }
        );
        authForm.reset();
    }

}