import React from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

const UserPosts = ({
    auth,
    posts,
    likePostById,
    unlikePostById,
    deletePostById,
    findUserLike
}) =>
    posts.map(post => (
        <PostItem
            key={post._id}
            auth={auth}
            post={post}
            likeById={likePostById}
            unlikeById={unlikePostById}
            deleteById={deletePostById}
            findUserLike={findUserLike}
        />
    ));

UserPosts.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    likePostById: PropTypes.func.isRequired,
    unlikePostById: PropTypes.func.isRequired,
    deletePostById: PropTypes.func.isRequired,
    findUserLike: PropTypes.func.isRequired
};

export default UserPosts;
