import { POST_ACTION } from "../action/types";

const initialState = {
    posts: [],
    post: {},
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACTION.ADD_POST_PENDING:
        case POST_ACTION.LIKE_POST_BY_ID_PENDING:
            return Object.assign({}, state, { loading: true });

        case POST_ACTION.ADD_POST_RESOLVE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case POST_ACTION.GET_ALL_POSTS_RESOLVE:
            return {
                ...state,
                posts: action.payload
            };

        case POST_ACTION.DELETE_POST_BY_ID_RESOLVE:
            return Object.assign({}, state, {
                posts: state.posts.filter(post => post._id !== action.payload)
            });

        case POST_ACTION.LIKE_POST_BY_ID_RESOLVE:
            const likedPost = state.posts.find(
                posts => posts._id === action.payload.postId
            );
            likedPost.likes.unshift({
                user: action.payload.user
            });
            return Object.assign({}, state, {
                posts: [
                    ...state.posts.filter(
                        post => post._id !== action.payload.postId
                    ),
                    likedPost
                ]
            });

        default:
            return state;
    }
};

export default postReducer;
