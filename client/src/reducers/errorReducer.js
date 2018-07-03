import { USER_REGISTER_REJECT, USER_LOGIN_REJECT } from '../action/types';

const initState = {};

export const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_REGISTER_REJECT:
            return action.payload;
        case USER_LOGIN_REJECT:
            return action.payload;
        default:
            return state;
    }
};
