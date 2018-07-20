import axios from "axios";
import { POST_ACTION } from "./types";

export const addPost = (postData, history) => async dispatch => {
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
// this code is duplicate!
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

export const deletePostById = postId => async dispatch => {};
