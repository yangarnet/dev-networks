import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({ auth, comments }) => {
    const commentList = comments.map(comment => (
        <CommentItem auth={auth} comment={comment} key={comment._id} />
    ));
    return <div className="comments">{commentList}</div>;
};

export default CommentFeed;
