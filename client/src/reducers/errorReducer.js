import * as PROFILE_ACTION from "../action/types";

const initState = {};

export const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case PROFILE_ACTION.USER_REGISTER_REJECT:
        case PROFILE_ACTION.USER_LOGIN_REJECT:
        case PROFILE_ACTION.CREATE_PROFILE_REJECT:
        case PROFILE_ACTION.ADD_USER_EXPERIENCE_REJECT:
        case PROFILE_ACTION.ADD_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EXPERIENCE_REJECT:
            return action.payload;
        case PROFILE_ACTION.CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
};
