import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private signupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0rQyoGwBIhqgSyM_BOTGz_UN6jO8hCQ8";

    private loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0rQyoGwBIhqgSyM_BOTGz_UN6jO8hCQ8";

    user = new BehaviorSubject<User>(null);

    private tokenExpTimer: any;

    constructor(private httpClient: HttpClient) { }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap((response) => { this.handleData(response) }));
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(this.loginUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap((response) => { this.handleData(response) }));
    }

    logout(){
        this.user.next(null);
        localStorage.clear();
        if(this.tokenExpTimer){
            clearTimeout(this.tokenExpTimer);
        }
        this.tokenExpTimer = null;
    }

    private handleError(errorRes){
        let eMessage = "An Unknown Error Occured";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(eMessage);
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
        return throwError(eMessage);
    }

    private handleData(response) {
        let expiryDate = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
        const newUser = new User(response.email, response.localId, response.idToken, expiryDate);
        this.user.next(newUser);
        this.autoLogout(parseInt(response.expiresIn) * 1000);
        localStorage.setItem('userData', JSON.stringify(newUser));   
    }

    autoLogin(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiry));
        if(loadedUser.token){
            this.user.next(loadedUser);
            let newExpTime = new Date(userData._tokenExpiry).getTime() - new Date().getTime();
            this.autoLogout(newExpTime);
        }
    }

    autoLogout(expirationTime: number) {
        this.tokenExpTimer = setTimeout(
            () => {
                this.logout();
            }, expirationTime
        );
    }

}