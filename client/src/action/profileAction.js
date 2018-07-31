import axios from "axios";

import { CLEAR_ERRORS, PROFILE_ACTION } from "./types";

export const getCurrentProfile = () => async dispatch => {
    dispatch({ type: PROFILE_ACTION.GET_PROFILE_PENDING });
    try {
        const res = await axios.get("/api/profile");
        dispatch({
            type: PROFILE_ACTION.GET_PROFILE_RESOLVE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.GET_PROFILE_REJECT,
            payload: error.response.data
        });
    }
};

export const getUserProfileByHandle = handle => async dispatch => {
    dispatch({ type: PROFILE_ACTION.GET_PROFILE_BY_HANDLE_PENDING });
    try {
        const response = await axios.get(`/api/profile/handle/${handle}`);
        dispatch({
            type: PROFILE_ACTION.GET_PROFILE_BY_HANDLE_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.GET_PROFILE_BY_HANDLE_REJECT,
            payload: error.response.data
        });
    }
};

export const fetchAllUsersProfile = () => async (dispatch, getState) => {
    if (getState().profile.profileList) {
        return;
    } else {
        dispatch({ type: PROFILE_ACTION.GET_ALL_PROFILE_PENDING });
        try {
            const response = await axios.get("/api/profile/all");
            dispatch({
                type: PROFILE_ACTION.GET_ALL_PROFILE_RESOLVE,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: PROFILE_ACTION.GET_ALL_PROFILE_REJECT,
                payload: error.response.data
            });
        }
    }
};

const reloadAllUserProfiles = () => async dispatch => {
    dispatch({ type: PROFILE_ACTION.RELOAD_ALL_USER_PROFILES });
    try {
        const response = await axios.get("/api/profile/all");
        dispatch({
            type: PROFILE_ACTION.GET_ALL_PROFILE_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.GET_ALL_PROFILE_REJECT,
            payload: error.response.data
        });
    }
};

export const createUserProfile = (profile, history) => async dispatch => {
    dispatch({ type: PROFILE_ACTION.CREATE_PROFILE_PENDING });
    try {
        const res = await axios.post("/api/profile", profile);
        dispatch({
            type: PROFILE_ACTION.CREATE_PROFILE_RESOLVE,
            payload: res.data
        });
        history.push("/dashboard");
        dispatch(reloadAllUserProfiles());
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.CREATE_PROFILE_REJECT,
            payload: error.response.data
        });
    }
};

export const clearCurrentUserProfile = () => {
    return {
        type: PROFILE_ACTION.CLEAR_CURRENT_USER_PROFILE
    };
};

export const deleteUserAccount = () => dispatch => {
    if (window.confirm("Are you sure? this cannot be undone")) {
        // TODO
    }
};

export const updateUserProfile = (profile, history) => async dispatch => {
    dispatch({ type: PROFILE_ACTION.EDIT_PROFILE_PENDING });
    try {
        const newProfile = await axios.put("/api/profile", profile, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: localStorage.getItem("jwt")
            }
        });
        dispatch({
            type: PROFILE_ACTION.EDIT_PROFILE_RESOLVE,
            payload: newProfile.data
        });
        history.push("/dashboard");
    } catch (err) {
        dispatch({
            type: PROFILE_ACTION.EDIT_PROFILE_REJECT,
            payload: err.response.data
        });
        history.push("/edit-profile");
    }
};

export const getCurrentUserProfileIfNecessary = () => (dispatch, getState) => {
    if (getState().profile.profile) {
        return;
    } else {
        dispatch({ type: PROFILE_ACTION.REFETCH_USER_PROFILE });
        dispatch(getCurrentProfile());
    }
};

export const addUserExperience = (
    userExperience,
    history
) => async dispatch => {
    try {
        dispatch({ type: PROFILE_ACTION.ADD_USER_EXPERIENCE_PENDING });
        const response = await axios.post(
            "/api/profile/experience",
            userExperience
        );
        // resolve
        dispatch({
            type: PROFILE_ACTION.ADD_USER_EXPERIENCE_RESOLVE,
            payload: response.data
        });
        history.push("/dashboard");
    } catch (error) {
        const errorData = error.response.data;
        dispatch({
            type: PROFILE_ACTION.ADD_USER_EXPERIENCE_REJECT,
            payload: errorData
        });
    }
};
//  the code here is bit of duplicate, can be better.
export const addUserEducation = (userEducation, history) => async dispatch => {
    try {
        dispatch({
            type: PROFILE_ACTION.ADD_USER_EDUCATION_PENDING
        });

        const response = await axios.post(
            "/api/profile/education",
            userEducation
        );
        dispatch({
            type: PROFILE_ACTION.ADD_USER_EDUCATION_RESOLVE,
            payload: response.data
        });

        history.push("/dashboard");
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.ADD_USER_EDUCATION_REJECT,
            payload: error.response.data
        });
    }
};

// a bit ducplicate here
export const deleteUserExperience = expId => async dispatch => {
    try {
        dispatch({ type: PROFILE_ACTION.DELETE_USER_EXPERIENCE_PENDING });
        const response = await axios.delete(`/api/profile/experience/${expId}`);
        dispatch({
            type: PROFILE_ACTION.DELETE_USER_EXPERIENCE_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.DELETE_USER_EXPERIENCE_REJECT,
            payload: error.response.data
        });
    }
};

export const deleteUserEducation = eduId => async dispatch => {
    try {
        dispatch({ type: PROFILE_ACTION.DELETE_USER_EDUCATION_PENDING });
        const response = await axios.delete(`/api/profile/education/${eduId}`);
        dispatch({
            type: PROFILE_ACTION.DELETE_USER_EDUCATION_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ACTION.DELETE_USER_EDUCATION_REJECT,
            payload: error.response.data
        });
    }
};
