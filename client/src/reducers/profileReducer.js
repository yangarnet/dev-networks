import { PROFILE_ACTION } from "../action/types";

const initState = {
    profile: null,
    profileList: null,
    loading: false
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case PROFILE_ACTION.GET_PROFILE_PENDING:
            return Object.assign({}, state, { loading: true });
        case PROFILE_ACTION.GET_PROFILE_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });
        case PROFILE_ACTION.GET_PROFILE_REJECT:
        case PROFILE_ACTION.CLEAR_CURRENT_USER_PROFILE:
            return Object.assign({}, state, { profile: null, loading: false });
        case PROFILE_ACTION.CREATE_PROFILE_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });
        case PROFILE_ACTION.EDIT_PROFILE_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });
        case PROFILE_ACTION.EDIT_PROFILE_REJECT:
        case PROFILE_ACTION.USER_REGISTER_REJECT:
        case PROFILE_ACTION.USER_LOGIN_REJECT:
        case PROFILE_ACTION.CREATE_PROFILE_REJECT:
        case PROFILE_ACTION.ADD_USER_EXPERIENCE_REJECT:
        case PROFILE_ACTION.ADD_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EDUCATION_REJECT:
        case PROFILE_ACTION.DELETE_USER_EXPERIENCE_REJECT:
        case PROFILE_ACTION.GET_ALL_PROFILE_REJECT:
            return Object.assign({}, state, { loading: false });

        case PROFILE_ACTION.ADD_USER_EXPERIENCE_PENDING:
        case PROFILE_ACTION.ADD_USER_EDUCATION_PENDING:
        case PROFILE_ACTION.DELETE_USER_EDUCATION_PENDING:
        case PROFILE_ACTION.DELETE_USER_EXPERIENCE_PENDING:
        case PROFILE_ACTION.GET_ALL_PROFILE_PENDING:
            return Object.assign({}, state, { loading: true });

        case PROFILE_ACTION.ADD_USER_EXPERIENCE_RESOLVE:
        case PROFILE_ACTION.ADD_USER_EDUCATION_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });

        case PROFILE_ACTION.GET_ALL_PROFILE_RESOLVE:
            return Object.assign({}, state, {
                profileList: action.payload,
                loading: false
            });

        case PROFILE_ACTION.DELETE_USER_EDUCATION_RESOLVE:
        case PROFILE_ACTION.DELETE_USER_EXPERIENCE_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });
        default:
            return state;
    }
};

export default profileReducer;
