import { SET_CURRENT_USER } from '../action/types';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { isEmpty } from '../utils/helper';

const initState = {
    isAuthenticated: false,
    user: {}
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return Object.assign({}, state,
                {
                    isAuthenticated: !isEmpty(action.payload),
                    user: action.payload
                });
        }
        default:
            return state;
    }
};

