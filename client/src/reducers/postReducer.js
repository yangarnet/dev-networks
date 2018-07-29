import { POST_ACTION } from "../action/types";
import { isEmpty } from "../utils/helper";

const initialState = {
    posts: [],
    post: {},
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACTION.ADD_POST_PENDING:
        case POST_ACTION.LIKE_POST_BY_ID_PENDING:
        case POST_ACTION.GET_ALL_POSTS_PENDING:
        case POST_ACTION.LIKE_POST_BY_ID_PENDING:
        case POST_ACTION.UNLIKE_POST_BY_ID_PENDING:
        case POST_ACTION.EDIT_POST_BY_ID_PENDING:
        case POST_ACTION.DELETE_POST_BY_ID_PENDING:
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
            return Object.assign({}, state, { loading: false });

        case POST_ACTION.LIKE_POST_BY_ID_RESOLVE:
            const likedPost = state.posts.find(
                post => post._id === action.payload.postId
            );
            if (likedPost) {
                likedPost.likes.unshift({
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

            isEmpty(unlikedPost)
                ? Object.assign({}, state, {
                      posts: state.posts.filter(
                          post =>
                              post._id !== action.payload.postId &&
                              post.likes.every(
                                  like => like.user !== action.payload.user
                              )
                      ),
                      loading: false
                  })
                : state;
            break;
        default:
            return state;
    }
};

export default postReducer;
