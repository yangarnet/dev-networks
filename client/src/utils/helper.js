
import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        // apply to subsequent req, so sys knows who is logged in and can get
        // user profile properly(not get wrong profile)
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const isEmpty = (obj) => {
    return obj === undefined || obj === null ||
        (typeof obj === 'object' && Object.keys(obj).length === 0) ||
        (typeof obj === 'string' && obj.trim().length === 0) ||
        (Array.isArray(obj) && obj.length === 0);
};

