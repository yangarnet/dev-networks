import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

const PostItem = ({
    auth,
    post,
    showActions,
    likeById,
    unlikeById,
    findUserLike,
    deleteById
}) => (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-2">
                <Link to="/profiles">
                    <img
                        className="rounded-circle d-none d-md-block"
                        src={post.avatar}
                        alt={post.userName}
                    />
                </Link>
                <br />
                <p className="text-center">{post.userName}</p>
            </div>
            <div className="col-md-10">
                <h5>{post.name}</h5>
                <blockquote>
                    <p>{post.text}</p>
                </blockquote>
                {showActions ? (
                    <span>
                        <button
                            type="button"
                            className="btn btn-light mr-1"
                            onClick={() => likeById(auth.user.id, post._id)}
                        >
                            <i
                                className={classnames("fas fa-thumbs-up", {
                                    "text-info": findUserLike(post)
                                })}
                            />
                            <span className="badge badge-light">
                                {post.likes.length}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light mr-1"
                            onClick={() => unlikeById(auth.user.id, post._id)}
                        >
                            <i className="text-secondary fas fa-thumbs-down" />
                        </button>
                        <Link
                            to={`/post/comments/${post._id}`}
                            className="btn btn-info mr-1"
                        >
                            Comments ({post.comments.length})
                        </Link>
                        {post.user === auth.user.id ? (
                            <button
                                type="button"
                                className="btn btn-danger mr-1"
                                onClick={() => {
                                    deleteById(post._id);
                                }}
                            >
                                <i className="fas fa-times"> Remove Post</i>
                            </button>
                        ) : null}
                    </span>
                ) : null}
            </div>
        </div>
    </div>
);

export default PostItem;
