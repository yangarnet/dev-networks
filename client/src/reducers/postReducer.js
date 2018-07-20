import { POST_ACTION } from "../action/types";

const initialState = {
    posts: [], // meaning same user can add multiple posts
    post: {},
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACTION.ADD_POST_PENDING:
            return Object.assign({}, state, { loading: true });
        case POST_ACTION.ADD_POST_RESOLVE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
    }
    return initialState;
};

export default postReducer;
