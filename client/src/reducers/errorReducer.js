import {
    USER_REGISTER_REJECT,
    USER_LOGIN_REJECT,
    CREATE_PROFILE_REJECT,
    CLEAR_ERRORS
} from "../action/types";

const initState = {};

export const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_REGISTER_REJECT:
        case USER_LOGIN_REJECT:
        case CREATE_PROFILE_REJECT:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
};
