import {
    AUTH_ACTION,
    PROFILE_ACTION,
    CLEAR_ERRORS,
    POST_ACTION,
    COMMENT_ACTION
} from "../action/types";

const initState = {};

export const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_ACTION.USER_REGISTER_REJECT:
        case AUTH_ACTION.USER_LOGIN_REJECT:
        case PROFILE_ACTION.CREATE_PROFILE_REJECT:
        case PROFILE_ACTION.ADD_USER_EXPERIENCE_REJECT:
        case PROFILE_ACTION.ADD_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EXPERIENCE_REJECT:
        case PROFILE_ACTION.GET_ALL_PROFILE_REJECT:
        case PROFILE_ACTION.EDIT_PROFILE_REJECT:
        case PROFILE_ACTION.GET_PROFILE_BY_HANDLE_REJECT:
        case POST_ACTION.ADD_POST_REJECT:
        case POST_ACTION.GET_ALL_POSTS_REJECT:
        case POST_ACTION.DELETE_POST_BY_ID_REJECT:
        case POST_ACTION.UNLIKE_POST_BY_ID_REJECT:
        case COMMENT_ACTION.ADD_COMMENT_REJECT:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
};
