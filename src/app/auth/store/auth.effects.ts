import { Actions, ofType, Effect } from '@ngrx/effects';
import { LOGIN_START, LoginStart, AuthSuccess, AUTH_SUCCESS, AuthFail, SIGNUP_START, SignupStart, LOGOUT, AUTO_LOGIN } from './auth.actions'
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { AuthResponseData } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {

    private signupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey;
    private loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;

    private handleAuthentication = (expiresIn, email, localId, idToken) => {
        let expiryDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
        const newUser = new User(email, localId, idToken, expiryDate);
        localStorage.setItem('userData', JSON.stringify(newUser));
        this.authService.setLogoutTimer(+expiresIn * 1000);
        return new AuthSuccess({
            email: email,
            userId: localId,
            token: idToken,
            expDate: expiryDate,
            redirect: true
        });
    }

    private handleError = (errorRes) => {
        let eMessage = "An Unknown Error Occured";
        if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthFail(eMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                eMessage = "This email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                eMessage = "This email is not registered";
                break;
            case 'INVALID_PASSWORD':
                eMessage = "This email password is incorrect";
                break;
        }
        return of(new AuthFail(eMessage));
    }

    @Effect()
    authSignup = this.action$.pipe(
        ofType(SIGNUP_START),
        switchMap((signupAction: SignupStart) => {
            return this.httpClient.post<AuthResponseData>(this.signupUrl, {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }).pipe(
                map((resData) => {
                    return this.handleAuthentication(
                        resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );
                }),
                catchError((errorRes) => {
                    return this.handleError(errorRes);
                })
            );
        })
    );

    @Effect()
    authLogin = this.action$.pipe(
        ofType(LOGIN_START),
        switchMap((authData: LoginStart) => {
            return this.httpClient.post<AuthResponseData>(this.loginUrl, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map((resData) => {
                    return this.handleAuthentication(
                        resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );
                }),
                catchError((errorRes) => {
                    return this.handleError(errorRes);
                })
            );
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.action$.pipe(
        ofType(AUTH_SUCCESS),
        tap((authState: AuthSuccess) => {
            if (authState.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect()
    authAutoLogin = this.action$.pipe(
        ofType(AUTO_LOGIN),
        map(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: "NONE" };
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpiry)
            );

            if (loadedUser.token) {
                // this.user.next(loadedUser);
                let newExpTime = new Date(userData._tokenExpiry).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(newExpTime);
                return new AuthSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expDate: new Date(userData._tokenExpiry),
                    redirect:false
                });
                // let newExpTime = new Date(userData._tokenExpiry).getTime() - new Date().getTime();
                // this.autoLogout(newExpTime);
            }
            return { type: 'NONE' }
        })
    )

    @Effect({ dispatch: false })
    authLogout = this.action$.pipe(
        ofType(LOGOUT),
        tap(() => {
            localStorage.clear();
            this.router.navigate(['/auth']);
        })
    )

    constructor(
        private action$: Actions,
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService) { }
}
