import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ auth, post, deleteById }) => (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                    <img
                        className="rounded-circle d-none d-md-block"
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                        alt=""
                    />
                </a>
                <br />
                <p className="text-center">John Doe</p>
            </div>
            <div className="col-md-10">
                <p className="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint possimus corporis sunt necessitatibus! Minus nesciunt
                    soluta suscipit nobis. Amet accusamus distinctio cupiditate
                    blanditiis dolor? Illo perferendis eveniet cum cupiditate
                    aliquam?
                </p>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-up" />
                    <span className="badge badge-light">4</span>
                </button>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                </Link>
                {/* delete button if you are the post creator*/}
                {post.user === auth.user.id ? (
                    <button
                        type="button"
                        classNameName="btn btn-danger mr-1"
                        onClick={() => deleteById(post._id)}
                    >
                        <i classNameName="fas fa-times" />
                    </button>
                ) : null}
            </div>
        </div>
    </div>
);

export default PostItem;
