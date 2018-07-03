import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
    myAuth: authReducer,
    errors: errorReducer
})

export default rootReducer;
