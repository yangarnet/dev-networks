import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { Spinner } from "../common/Spinner";
import UserPosts from "./UserPosts";
import {
    fetchAllPosts,
    likePostById,
    deletePostById
} from "../../action/postAction";
import { isEmpty } from "../../utils/helper";

class Posts extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const {
            auth,
            posts,
            loading,
            likePostById,
            deletePostById
        } = this.props;
        let postContent;

        if (loading) {
            postContent = <Spinner />;
        } else {
            postContent = isEmpty(posts) ? null : (
                <UserPosts
                    auth={!isEmpty(auth) ? auth : {}}
                    posts={posts}
                    likePostById={likePostById}
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
        likePostById: (userId, postId) =>
            dispatch(likePostById(userId, postId)),
        deletePostById: postId => dispatch(deletePostById(postId))
    };
};

Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    likePostById: PropTypes.func.isRequired,
    deletePostById: PropTypes.func.isRequired
};

Posts.defaultProps = {
    auth: {},
    loading: true,
    posts: []
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);
