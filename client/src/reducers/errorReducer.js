import { USER_REGISTER_ERROR } from '../action/types';

const initState = {};

export const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_REGISTER_ERROR:
            return action.payload
        default:
            return state;
    }
};
