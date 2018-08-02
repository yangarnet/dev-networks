import { POST_ACTION, COMMENT_ACTION } from "../action/types";
const initialState = {
    posts: [], // post list
    post: {}, // a selected post
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACTION.ADD_POST_PENDING:
        case POST_ACTION.LIKE_POST_BY_ID_PENDING:
        case POST_ACTION.GET_ALL_POSTS_PENDING:
        case POST_ACTION.UNLIKE_POST_BY_ID_PENDING:
        case POST_ACTION.EDIT_POST_BY_ID_PENDING:
        case POST_ACTION.DELETE_POST_BY_ID_PENDING:
        case COMMENT_ACTION.ADD_COMMENT_PENDING:
        case COMMENT_ACTION.DELETE_COMMENT_BY_ID_PENDING:
            return Object.assign({}, state, { loading: true });

        case POST_ACTION.ADD_POST_RESOLVE:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: false
            };
        case POST_ACTION.GET_ALL_POSTS_RESOLVE:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };

        case POST_ACTION.DELETE_POST_BY_ID_RESOLVE:
            return Object.assign({}, state, {
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            });

        case POST_ACTION.LIKE_POST_BY_ID_REJECT:
        case POST_ACTION.ADD_POST_REJECT:
        case POST_ACTION.DELETE_POST_BY_ID_REJECT:
        case POST_ACTION.EDIT_POST_BY_ID_REJECT:
        case POST_ACTION.GET_ALL_POSTS_REJECT:
        case POST_ACTION.GET_POST_BY_ID_REJECT:
        case POST_ACTION.UNLIKE_POST_BY_ID_REJECT:
        case COMMENT_ACTION.ADD_COMMENT_REJECT:
        case COMMENT_ACTION.DELETE_COMMENT_BY_ID_REJECT:
            return Object.assign({}, state, { loading: false });

        case POST_ACTION.LIKE_POST_BY_ID_RESOLVE:
            const likedPost = state.posts.find(
                post => post._id === action.payload.postId
            );
            if (likedPost) {
                likedPost.likes = likedPost.likes.concat({
                    user: action.payload.user
                });
            }
            return Object.assign({}, state, {
                posts: [
                    ...state.posts.filter(
                        post => post._id !== action.payload.postId
                    ),
                    likedPost
                ],
                loading: false
            });

        case POST_ACTION.UNLIKE_POST_BY_ID_RESOLVE:
            const unlikedPost = state.posts.find(
                post => post._id === action.payload.postId
            );

            if (unlikedPost) {
                unlikedPost.likes = unlikedPost.likes.filter(
                    like => like.user !== action.payload.user
                );
            }

            return Object.assign({}, state, {
                posts: [
                    ...state.posts.filter(
                        post => post._id !== action.payload.postId
                    ),
                    unlikedPost
                ],
                loading: false
            });

        case COMMENT_ACTION.ADD_COMMENT_RESOLVE:
        case COMMENT_ACTION.DELETE_COMMENT_BY_ID_RESOLVE:
            return Object.assign({}, state, {
                post: action.payload
            });

        default:
            return state;
    }
};

export default postReducer;
