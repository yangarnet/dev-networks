import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { Spinner } from "../common/Spinner";
import UserPosts from "./UserPosts";
import { fetchAllPosts, deletePostById } from "../../action/postAction";
import { isEmpty } from "../../utils/helper";

class Posts extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const { auth, posts, loading, deletePostById } = this.props;
        let postContent;

        if (isEmpty(posts) || loading) {
            postContent = <Spinner />;
        } else {
            postContent = (
                <UserPosts
                    auth={auth}
                    posts={posts}
                    deletePostById={deletePostById}
                />
            );
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="col-md-12">
                        {/* form to add new post*/}
                        <PostForm />
                        {/* list all user posts*/}
                        {postContent}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    if (isEmpty(post)) {
        return {
            auth: {},
            loading: true,
            posts: []
        };
    } else {
        return {
            auth: state.myAuth,
            posts: post.posts,
            loading: false
        };
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllPosts: () => dispatch(fetchAllPosts()),
        deletePostById: postId => dispatch(deletePostById(postId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);
