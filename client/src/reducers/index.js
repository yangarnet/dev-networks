import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { profileReducer } from './profileReducer';

// root reducer defines the shape of the app state.
const rootReducer = combineReducers({
    myAuth: authReducer,
    errors: errorReducer,
    profile: profileReducer
})

export default rootReducer;
