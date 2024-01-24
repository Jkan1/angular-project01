import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from '../auth/store/auth.actions';

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

    private tokenExpTimer;

    constructor(private store: Store<AppState>) { }

    setLogoutTimer(expirationTime: number) {
        this.tokenExpTimer = setTimeout(
            () => {
                this.store.dispatch(new Logout());
            }, expirationTime
        );
    }

    clearLogoutTimer(){
        if(this.tokenExpTimer){
            clearTimeout(this.tokenExpTimer);
            this.tokenExpTimer = null;
        }
    }

}
