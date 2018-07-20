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
