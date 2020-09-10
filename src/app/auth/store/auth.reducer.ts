import { User } from '../user.model';
import { AuthActions, AUTH_SUCCESS, LOGOUT, LOGIN_START, AUTH_FAIL, SIGNUP_START, CLEAR_ERROR, VERIFY_SUCCESS, VERIFY_START } from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expDate,
                action.payload.emailVerified,
                action.payload.displayName,
                action.payload.profileImage
            );
            return {
                ...state,
                authError: null,
                user: newUser,
                loading: false
            }
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AUTH_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                ...state,
                authError: null,
                user: null
            }
        case VERIFY_SUCCESS:
            const verifiedUser = new User(
                state.user.email,
                state.user.id,
                state.user.token,
                state.user._tokenExpiry,
                action.payload.emailVerified,
                state.user.displayName,
                state.user.profileImage
            );
            return {
                ...state,
                user: verifiedUser
            };
        case VERIFY_START:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default:
            return { ...state };
    }
}
