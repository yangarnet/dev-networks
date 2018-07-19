import { AUTH_ACTION } from "../action/types";
import { isEmpty } from "../utils/helper";

const initState = {
    isAuthenticated: false,
    user: {}
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_ACTION.SET_CURRENT_USER: {
            return Object.assign({}, state, {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            });
        }
        default:
            return state;
    }
};
