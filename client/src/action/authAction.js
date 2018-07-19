import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/helper";

import { AUTH_ACTION, CLEAR_ERRORS } from "./types";

const userRegisterResolve = payload => ({
    type: AUTH_ACTION.USER_REGISTER_RESOLVE,
    payload
});

export const registerUser = (userData, history) => dispatch => {
    dispatch({ type: AUTH_ACTION.USER_REGISTER_PENDING });
    dispatch({ type: CLEAR_ERRORS });
    axios.post("/api/user/register", userData).then(
        res => {
            dispatch(userRegisterResolve(res.data));
            history.push("/login");
        },
        err => {
            dispatch({
                type: AUTH_ACTION.USER_REGISTER_REJECT,
                payload: err.response.data
            });
        }
    );
};

export const setCurrentLoggedInUser = decoded => {
    return {
        type: AUTH_ACTION.SET_CURRENT_USER,
        payload: decoded
    };
};

// async action user login, this will set user information in the localStorage
// identify who is logged in
export const userLogin = userData => dispatch => {
    dispatch({ type: AUTH_ACTION.USER_LOGIN_PENDING });
    axios.post("/api/user/login", userData).then(
        res => {
            const { token } = res.data;
            //save to local storage, so subsequent request will know who is logged in.
            localStorage.setItem("jwt", token);
            // set auth header, so subsequent request will who is logged in.
            setAuthToken(token);
            // decode the token and set current logged in user
            const decoded = jwt_decode(token);
            // set the current login user.
            dispatch(setCurrentLoggedInUser(decoded));
            dispatch({ type: AUTH_ACTION.USER_LOGIN_RESOLVE });
        },
        err => {
            dispatch({
                type: AUTH_ACTION.USER_LOGIN_REJECT,
                payload: err.response.data
            });
        }
    );
};

export const userLogout = () => dispatch => {
    dispatch({ type: AUTH_ACTION.USER_LOGOUT });
    // remove the token from local storage
    localStorage.removeItem("jwt");
    // remove auth header for future req
    setAuthToken(false);
    // set isAuthenticated false and user {}, so isAuthenticated will be false
    dispatch(setCurrentLoggedInUser({}));
};
