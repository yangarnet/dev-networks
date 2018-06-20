import axios from 'axios';

import { USER_REGISTER_ERROR } from './types';

export const registerUser = (userData) => async (dispatch) => {
    axios.post('/api/user/register', userData)
        .then(res => console.log(res.data))
        .catch(err => {
            dispatch({
                type: USER_REGISTER_ERROR,
                payload: err.response.data
            });
        });
};
