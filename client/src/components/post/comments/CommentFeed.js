import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({ postId, auth, comments, deleteCommentById }) => {
    const commentList = comments.map(comment => (
        <CommentItem
            postId={postId}
            auth={auth}
            comment={comment}
            key={comment._id}
            deleteComment={deleteCommentById}
        />
    ));
    return <div className="comments">{commentList}</div>;
};

export default CommentFeed;
