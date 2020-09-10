import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { AuthResponseData } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { LOGIN_START, LoginStart, AuthSuccess, AUTH_SUCCESS, AuthFail, SIGNUP_START, SignupStart, LOGOUT, AUTO_LOGIN, VERIFY_START, VerifyStart, VerifySuccess } from './auth.actions'

@Injectable()
export class AuthEffects {

    private signupUrl = environment.firebaseSignupUrl + environment.firebaseApiKey;
    private loginUrl = environment.firebaseSignInWithPasswordUrl + environment.firebaseApiKey;
    private setProfileUrl = environment.firebaseSetUserProfileUrl + environment.firebaseApiKey;
    private getProfileUrl = environment.firebaseGetUserProfileUrl + environment.firebaseApiKey;
    private sendEmailVerificationUrl = environment.sendEmailVerificationUrl + environment.firebaseApiKey;

    private handleAuthentication = (expiresIn, email, localId, idToken, isVerified, userName, profileImage) => {
        let expiryDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
        const newUser = new User(email, localId, idToken, expiryDate, isVerified, userName, profileImage);
        localStorage.setItem('userData', JSON.stringify(newUser));
        this.authService.setLogoutTimer(+expiresIn * 1000);
        return new AuthSuccess({
            email: email,
            userId: localId,
            token: idToken,
            expDate: expiryDate,
            redirect: true,
            emailVerified: newUser.emailVerified,
            displayName: newUser.displayName,
            profileImage: newUser.profileImage
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
                switchMap((resData) => {
                    const localId = resData.localId;
                    const idToken = resData.idToken;
                    const email = resData.email;
                    const expiresIn = resData.expiresIn;
                    return this.httpClient.post<any>(this.setProfileUrl, {
                        idToken: idToken,
                        displayName: signupAction.payload.userName,
                        photoUrl: signupAction.payload.profileImage,
                        returnSecureToken:true
                    }).pipe(
                        map((resData) => {
                            let emailVerified: boolean;
                            let displayName: string;
                            let profileImage: string;
                            if (resData) {
                                emailVerified = resData.emailVerified;
                                displayName = resData.displayName;
                                profileImage = resData.photoUrl;
                            }
                            return this.handleAuthentication(
                                expiresIn,
                                email,
                                localId,
                                idToken,
                                emailVerified,
                                displayName,
                                profileImage
                            );
                        }),
                        catchError((errorRes) => {
                            return this.handleError(errorRes);
                        })
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
                switchMap((resData) => {
                    const localId = resData.localId;
                    const idToken = resData.idToken;
                    const email = resData.email;
                    const expiresIn = resData.expiresIn;
                    return this.httpClient.post<any>(this.getProfileUrl, {
                        idToken: idToken
                    }).pipe(
                        map((resData) => {
                            let emailVerified: boolean;
                            let displayName:string;
                            let profileImage:string;
                            if (resData && resData.users && resData.users[0]) {
                                emailVerified = resData.users[0].emailVerified;
                                displayName = resData.users[0].displayName;
                                profileImage = resData.users[0].photoUrl;
                            }
                            return this.handleAuthentication(
                                expiresIn,
                                email,
                                localId,
                                idToken,
                                emailVerified,
                                displayName,
                                profileImage
                            );
                        }),
                        catchError((errorRes) => {
                            return this.handleError(errorRes);
                        })
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
                new Date(userData._tokenExpiry),
                userData.emailVerified,
                userData.displayName,
                userData.profileImage
            );

            if (loadedUser.token) {
                let newExpTime = new Date(userData._tokenExpiry).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(newExpTime);
                return new AuthSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expDate: new Date(userData._tokenExpiry),
                    redirect: false,
                    emailVerified: loadedUser.emailVerified,
                    displayName: loadedUser.displayName,
                    profileImage: loadedUser.profileImage
                });
            }
            return { type: 'NONE' }
        })
    );

    @Effect()
    userVerificationStart = this.action$.pipe(
        ofType(VERIFY_START),
        switchMap((verifyAction: VerifyStart) => {
            return this.httpClient.post<any>(this.sendEmailVerificationUrl, {
                requestType: 'VERIFY_EMAIL',
                idToken: verifyAction.payload.idToken
            }).pipe(
                map((result) => {
                    return new VerifySuccess();
                }),
                catchError((errorRes) => {
                    return this.handleError(errorRes);
                })
            );
        })
    );

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
