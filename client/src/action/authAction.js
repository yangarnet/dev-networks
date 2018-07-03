import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/helper';

import {
    USER_REGISTER_PENDING,
    USER_REGISTER_REJECT,
    USER_REGISTER_RESOLVE,
    USER_LOGIN_PENDING,
    USER_LOGIN_RESOLVE,
    USER_LOGIN_REJECT,
    SET_CURRENT_USER
} from './types';

const userRegisterResolve = (payload) => ({
    type: USER_REGISTER_RESOLVE,
    payload
});

export const registerUser = (userData, history) => (dispatch) => {
    dispatch({ type: USER_REGISTER_PENDING });
    axios.post('/api/user/register', userData)
        .then(res => {
            dispatch(userRegisterResolve(res.data));
            history.push('/login');
        }, err => {
            dispatch({
                type: USER_REGISTER_REJECT,
                payload: err.response.data
            });
        });
};

const setCurrentLoggedInUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// async action
export const userLogin = userData => dispatch => {
    dispatch({ type: USER_LOGIN_PENDING });
    axios.post('/api/user/login', userData)
        .then(res => {
            const { token } = res.data;
            //save to local storage
            localStorage.setItem('jwt', token);
            // set auth header
            setAuthToken(token);
            // decode the token and set current logged in user
            const decoded = jwt_decode(token);
            dispatch(setCurrentLoggedInUser(decoded));
            dispatch({ type: USER_LOGIN_RESOLVE });
        }, err => {
            dispatch({
                type: USER_LOGIN_REJECT,
                payload: err.response.data
            })
        })
};
