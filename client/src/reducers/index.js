import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
    myAuth: authReducer,
    regErrors: errorReducer
})

export default rootReducer;
