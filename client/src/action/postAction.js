import axios from "axios";
import { POST_ACTION } from "./types";

export const addPost = postData => async dispatch => {
    dispatch({
        type: POST_ACTION.ADD_POST_PENDING
    });
    try {
        const response = await axios.post("/api/post", postData);
        dispatch({
            type: POST_ACTION.ADD_POST_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: POST_ACTION.ADD_POST_REJECT,
            payload: error.response.data
        });
    }
};

export const fetchAllPosts = () => async dispatch => {
    dispatch({
        type: POST_ACTION.GET_ALL_POSTS_PENDING
    });
    try {
        const response = await axios.get("/api/post");
        dispatch({
            type: POST_ACTION.GET_ALL_POSTS_RESOLVE,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: POST_ACTION.GET_ALL_POSTS_REJECT,
            payload: error.response.data
        });
    }
};

export const deletePostById = postId => async dispatch => {
    dispatch({ type: POST_ACTION.DELETE_POST_BY_ID_PENDING });
    try {
        await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: POST_ACTION.DELETE_POST_BY_ID_RESOLVE,
            payload: postId
        });
    } catch (error) {
        dispatch({
            type: POST_ACTION.DELETE_POST_BY_ID_REJECT,
            payload: error.response.data
        });
    }
};

export const likePostById = (userId, postId) => async dispatch => {
    dispatch({ type: POST_ACTION.LIKE_POST_BY_ID_PENDING });
    try {
        await axios.post(`/api/post/like/${postId}`);
        dispatch({
            type: POST_ACTION.LIKE_POST_BY_ID_RESOLVE,
            payload: {
                postId,
                user: userId
            }
        });
    } catch (error) {
        dispatch({
            type: POST_ACTION.LIKE_POST_BY_ID_REJECT,
            payload: error
        });
    }
};
