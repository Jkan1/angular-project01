import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';
export const AUTH_FAIL = '[Auth] AUTH_FAIL';
export const SEND_EMAIL_START = '[Auth] SEND_EMAIL_START';
export const SEND_EMAIL_SUCCESS = '[Auth] SEND_EMAIL_SUCCESS';
export const VERIFY_START = '[Auth] VERIFY_START';
export const VERIFY_SUCCESS = '[Auth] VERIFY_SUCCESS';

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
    constructor(public payload: {
        email: string,
        password: string,
        userName?: string,
        profileImage?: string,
        inviteCode: string
    }) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class SendEmailStart implements Action {
    readonly type = SEND_EMAIL_START;
    constructor(public payload: { idToken: string }) { }
}

export class SendEmailSuccess implements Action {
    readonly type = SEND_EMAIL_SUCCESS;
}

export class VerifyStart implements Action {
    readonly type = VERIFY_START;
    constructor(public payload: { oobToken: string }) { }
}

export class VerifySuccess implements Action {
    readonly type = VERIFY_SUCCESS;
    constructor(public payload: { emailVerified: boolean }) { }
}

export type AuthActions = AuthSuccess
    | Logout
    | LoginStart
    | AuthFail
    | SignupStart
    | ClearError
    | AutoLogin
    | VerifyStart
    | VerifySuccess
    | SendEmailStart
    | SendEmailSuccess; 
