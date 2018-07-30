import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CommentItem = ({ auth, comment, deleteComment }) => {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={comment.avatar}
                            alt={comment.userName}
                        />
                    </a>
                    <br />
                    <p className="text-center">{comment.userName}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{comment.text}</p>
                    <br />
                    date added:{" "}
                    <Moment format="YYYY-MM-DD HH:mm">{comment.date}</Moment>
                    <br />
                    {comment.user === auth.user.id ? (
                        <button
                            type="button"
                            className="btn btn-danger mr-1"
                            onClick={() => {
                                deleteComment(comment._id);
                            }}
                        >
                            <i className="fas fa-times" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
