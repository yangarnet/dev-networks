import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { Spinner } from "../common/Spinner";
import UserPosts from "./UserPosts";
import {
    fetchAllPosts,
    likePostById,
    unlikePostById,
    deletePostById
} from "../../action/postAction";
import { isEmpty } from "../../utils/helper";
import requireAuth from "../security/requireAuth";
class Posts extends Component {
    constructor(props) {
        super(props);
        this.findUserLike = this.findUserLike.bind(this);
    }
    componentDidMount() {
        this.props.getAllPosts();
    }

    findUserLike(post) {
        if (isEmpty(post)) {
            return false;
        }
        return post.likes.length > 0;
    }

    render() {
        const {
            auth,
            posts,
            loading,
            likePostById,
            unlikePostById,
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
                    unlikePostById={unlikePostById}
                    deletePostById={deletePostById}
                    findUserLike={this.findUserLike}
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
        unlikePostById: (userId, postId) =>
            dispatch(unlikePostById(userId, postId)),
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
)(requireAuth(Posts));
