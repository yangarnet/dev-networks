import axios from "axios";

import {
    GET_PROFILE_PENDING,
    GET_PROFILE_RESOLVE,
    GET_PROFILE_REJECT,
    CLEAR_CURRENT_USER_PROFILE
} from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch({ type: GET_PROFILE_PENDING });
    axios.get("/api/profile").then(
        res => {
            console.log(res);
            dispatch({
                type: GET_PROFILE_RESOLVE,
                payload: res.data
            });
        },
        err => {
            dispatch({
                type: GET_PROFILE_REJECT,
                payload: err
            });
        }
    );
};

export const clearCurrentUserProfile = () => {
    return {
        type: CLEAR_CURRENT_USER_PROFILE
    };
};
