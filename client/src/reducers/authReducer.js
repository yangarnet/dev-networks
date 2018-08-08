import { AUTH_ACTION } from "../action/types";
import { isEmpty } from "../utils/helper";

const initState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_ACTION.USER_LOGIN_PENDING:
            return Object.assign({}, state, { loading: true });
        case AUTH_ACTION.USER_LOGIN_REJECT:
            return Object.assign({}, state, { loading: false });
        case AUTH_ACTION.SET_CURRENT_USER: {
            return Object.assign({}, state, {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            });
        }
        default:
            return state;
    }
};
