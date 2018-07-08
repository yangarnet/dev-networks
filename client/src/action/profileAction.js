import axios from "axios";

import {
    GET_PROFILE_PENDING,
    GET_PROFILE_RESOLVE,
    GET_PROFILE_REJECT,
    CLEAR_CURRENT_USER_PROFILE,
    CREATE_PROFILE_PENDING,
    CREATE_PROFILE_RESOLVE,
    CREATE_PROFILE_REJECT
} from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch({ type: GET_PROFILE_PENDING });
    axios.get("/api/profile").then(
        res => {
            dispatch({
                type: GET_PROFILE_RESOLVE,
                payload: res.data
            });
        },
        err => {
            dispatch({
                type: GET_PROFILE_REJECT,
                payload: err.response.data
            });
        }
    );
};

export const createUserProfile = (profile, history) => dispatch => {
    dispatch({ type: CREATE_PROFILE_PENDING });
    axios.post("/api/profile", profile).then(
        res => {
            dispatch({
                type: CREATE_PROFILE_RESOLVE,
                payload: res.data
            });
            history.push("/dashboard");
        },
        err => {
            dispatch({
                type: CREATE_PROFILE_REJECT,
                payload: err.response.data
            });
        }
    );
};

export const clearCurrentUserProfile = () => {
    return {
        type: CLEAR_CURRENT_USER_PROFILE
    };
};

export const deleteUserAccount = () => dispatch => {
    if (window.confirm("Are you sure? this cannot be undone")) {
    }
};
