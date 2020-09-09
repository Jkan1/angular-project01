import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';
export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export class AuthSuccess implements Action {
    readonly type = AUTH_SUCCESS;

    constructor(
        public payload: {
            email: string;
            userId: string;
            token: string;
            expDate: Date;
            redirect?: boolean;
            profileImage?: string;
            displayName?: string;
            emailVerified?: boolean;
        }
    ) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AuthFail implements Action {
    readonly type = AUTH_FAIL;
    constructor(public payload: string) { }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string, userName?: string, profileImage?: string }) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthSuccess | Logout | LoginStart | AuthFail | SignupStart | ClearError | AutoLogin; 
