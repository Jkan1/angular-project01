import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = true;

    constructor(private auth: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        const email = authForm.value.email;
        const password = authForm.value.password;
        if (this.isLoginMode) {
            //
        } else {
            this.auth.signup(email, password).subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
        authForm.reset();
    }

}