import {
    GET_PROFILE_PENDING,
    GET_PROFILE_RESOLVE,
    GET_PROFILE_REJECT,
    CLEAR_CURRENT_USER_PROFILE
} from "../action/types";

const initState = {
    profile: null,
    profiles: null,
    loading: false
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PROFILE_PENDING:
            return Object.assign({}, state, { loading: true });
        case GET_PROFILE_RESOLVE:
            return Object.assign({}, state, {
                profile: action.payload,
                loading: false
            });
        case GET_PROFILE_REJECT:
        case CLEAR_CURRENT_USER_PROFILE:
            return Object.assign({}, state, { profile: null, loading: false });
        default:
            return state;
    }
};

export default profileReducer;
