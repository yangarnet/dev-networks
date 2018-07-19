import { POST_ACTION } from "../action/types";

const initialState = {
    posts: [],
    post: {},
    loading: false
};

const postReducer = (state = initialState, action) => {
    return initialState;
};

export default postReducer;
