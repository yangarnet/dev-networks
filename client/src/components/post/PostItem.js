import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

const PostItem = ({ auth, post, deleteById }) => (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                    <img
                        className="rounded-circle d-none d-md-block"
                        src={auth.user.avatar}
                        alt={auth.user.name}
                    />
                </a>
                <br />
                <p className="text-center">{auth.user.name}</p>
            </div>
            <div className="col-md-10">
                <h5>{post.name}</h5>
                <blockquote>
                    <p>{post.text}</p>
                </blockquote>
                <button type="button" className="btn btn-light mr-1">
                    <i
                        className={classnames("fas fa-thumbs-up", {
                            "text-info": findUserLike(post.likes)
                        })}
                    />
                    <span className="badge badge-light">
                        {post.likes.length}
                    </span>
                </button>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                </Link>
                {post.user === auth.user.id ? (
                    <button
                        type="button"
                        className="btn btn-danger mr-1"
                        onClick={() => deleteById(post._id)}
                    >
                        <i className="fas fa-times"> Remove Post</i>
                    </button>
                ) : null}
            </div>
        </div>
    </div>
);

export default PostItem;
