import { User } from '../user.model';
import { AuthActions, LOGIN, LOGOUT } from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expDate
            );
            return {
                ...state,
                user: newUser
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}
