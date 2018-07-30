import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostItem from "../common/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { isEmpty } from "../../../utils/helper";

class PostComment extends Component {
    getPostById(posts, id) {
        return posts.find(post => post._id === id);
    }

    render() {
        const { post, posts, auth } = this.props;
        const postId = this.props.match.params.postId;
        const thePost = isEmpty(post) ? this.getPostById(posts, postId) : post;
        const postContent = (
            <div>
                <PostItem post={thePost} />
                <CommentForm postId={postId} />
                {isEmpty(thePost.comments) ? (
                    <h4>there is No comment on this post</h4>
                ) : (
                    <CommentFeed
                        postId={postId}
                        comments={thePost.comments}
                        auth={auth}
                    />
                )}
            </div>
        );

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                                to="/post-feed"
                                className="btn btn-light mb-3"
                            >
                                Back to Post List
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        post: state.post.post,
        auth: state.myAuth
    };
};

export default connect(mapStateToProps)(PostComment);
