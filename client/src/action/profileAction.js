import axios from "axios";

import {
    GET_PROFILE_PENDING,
    GET_PROFILE_RESOLVE,
    GET_PROFILE_REJECT,
    CLEAR_CURRENT_USER_PROFILE,
    CREATE_PROFILE_PENDING,
    CREATE_PROFILE_RESOLVE,
    CREATE_PROFILE_REJECT,
    EDIT_PROFILE_PENDING,
    EDIT_PROFILE_RESOLVE,
    EDIT_PROFILE_REJECT,
    REFETCH_USER_PROFILE
} from "./types";

export const getCurrentProfile = () => async dispatch => {
    dispatch({ type: GET_PROFILE_PENDING });
    try {
        const res = await axios.get("/api/profile");
        dispatch({
            type: GET_PROFILE_RESOLVE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_PROFILE_REJECT,
            payload: error.response.data
        });
    }
};

export const createUserProfile = (profile, history) => async dispatch => {
    dispatch({ type: CREATE_PROFILE_PENDING });
    try {
        const res = await axios.post("/api/profile", profile);
        dispatch({
            type: CREATE_PROFILE_RESOLVE,
            payload: res.data
        });
        history.push("/dashboard");
    } catch (error) {
        dispatch({
            type: CREATE_PROFILE_REJECT,
            payload: error.response.data
        });
    }
};

export const clearCurrentUserProfile = () => {
    return {
        type: CLEAR_CURRENT_USER_PROFILE
    };
};

export const deleteUserAccount = () => dispatch => {
    if (window.confirm("Are you sure? this cannot be undone")) {
        // TODO
    }
};

export const updateUserProfile = (profile, history) => async dispatch => {
    dispatch({ type: EDIT_PROFILE_PENDING });
    try {
        const newProfile = await axios.put("/api/profile", profile, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: localStorage.getItem("jwt")
            }
        });
        dispatch({
            type: EDIT_PROFILE_RESOLVE,
            payload: newProfile.data
        });
        history.push("/dashboard");
    } catch (err) {
        dispatch({ type: EDIT_PROFILE_REJECT, payload: err.response.data });
        history.push("/edit-profile");
    }
};

export const getCurrentUserProfileIfNecessary = () => (dispatch, getState) => {
    if (getState().profile.profile) {
        return;
    } else {
        dispatch({ type: REFETCH_USER_PROFILE });
        dispatch(getCurrentProfile());
    }
};
