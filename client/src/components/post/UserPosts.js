import React from "react";
import PostItem from "./PostItem";
const UserPosts = ({ auth, posts, deletePostById }) =>
    posts.map(post => (
        <PostItem
            key={post._id}
            auth={auth}
            post={post}
            deleteById={deletePostById}
        />
    ));

export default UserPosts;
