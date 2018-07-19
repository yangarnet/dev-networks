import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

// root reducer defines the shape of the app state.
export const rootReducer = combineReducers({
    myAuth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer
});

export default rootReducer;
