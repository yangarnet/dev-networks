import mongoose from "mongoose";
import gravatar from "gravatar";
import _ from "lodash";
import post from "../models/post";
import profile from "../models/profile";
import validateUserPost from "../validation/post";
class PostController {
    /*
    @desc add a new post for user
    @access private
    @route /api/post
    */
    async addNewPost(req, res) {
        const payload = _.pick(req.body, ["text", "name"]);
        const { errors, isValid } = validateUserPost(payload);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        payload.avatar = gravatar.url(payload.email, {
            s: "200",
            r: "pg",
            d: "mm"
        });
        payload.user = req.user.id;
        const newPost = new post(payload);
        try {
            const result = await newPost.save();
            res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    /*
    @desc edit post for user
    @access private
    @route /api/post/:post_id
    */
    async editPostById(req, res) {
        const payload = _.pick(req.body, ["text", "name"]);
        const { errors, isValid } = validateUserPost(payload);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            const result = await post.findById(req.params.post_id);
            if (!result) {
                errors.notfound = `cannot find the post id:${
                    req.params.post_id
                }`;
                return res.status(404).json(errors);
            }
            result.text = payload.text;
            result.name = payload.name;
            await result.save();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    /*
    @desc list all posts
    @access public
    @route /api/post
    */
    async fetchAllPosts(req, res) {
        try {
            const posts = await post.find().sort({ date: "descending" });
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    /*
    @desc get post by id
    @access public
    @route /api/post/:post_id
    */
    async fetchPostById(req, res) {
        try {
            const result = await post.findById(req.params.post_id);
            if (!result) {
                return res.status(404).json({
                    status: `cannot get the post with id:${req.params.post_id}`
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    /*
    @desc get post by id
    @access private
    @route /api/post/:post_id
    */
    async deletePostById(req, res) {
        const errors = {};
        try {
            // only a legal user can delete profile
            const userProfile = await profile.findOne({ user: req.user.id });
            if (!userProfile) {
                errors.notfound = "user profile not found";
                return res.status(404).json(errors);
            }
            const result = await post.findById(req.params.post_id);
            if (result) {
                if (result.user.toString() !== req.user.id) {
                    errors.unauthorized =
                        "the user is unauthorized to this post";
                    return res.status(401).json(errors);
                }
                await result.remove();
                return res.status(200).json({
                    status: `successfully remove post by id:${
                        req.params.post_id
                    }`
                });
            } else {
                errors.notfound = `cannot find the post by id:${
                    req.params.post_id
                }`;
                return res.status(404).json(errors);
            }
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }

    /*
    @desc like post by id
    @access private
    @route /api/post/like/:post_id
    */
    async likePostById(req, res) {
        const errors = {};
        try {
            const result = await post.findById(req.params.post_id);
            if (result) {
                if (
                    result.likes.filter(
                        like => like.user.toString() === req.user.id
                    ).length > 0
                ) {
                    return res
                        .status(400)
                        .json({ status: "you already liked the post" });
                }
                result.likes.unshift({ user: req.user.id });
                await result.save();
                return res
                    .status(200)
                    .json({ status: "thanks for likes of the post" });
            } else {
                errors.notfound = `cannot find post by id:${
                    req.params.post_id
                }`;
                return res.status(400).json(errors);
            }
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }
    /*
    @desc unlike post by id
    @access private
    @route /api/post/like/:post_id
    */
    async unlikePostById(req, res) {
        const errors = {};
        try {
            const result = await post.findById(req.params.post_id);
            if (result) {
                if (
                    result.likes.filter(
                        like => like.user.toString() === req.user.id
                    ).length === 0
                ) {
                    return res
                        .status(400)
                        .json({ status: "you did not liked the post before" });
                }
                const idx = result.likes.findIndex(
                    like => like.user.toString() === req.user.id
                );
                result.likes.splice(idx, 1);
                await result.save();
                return res
                    .status(200)
                    .json({ status: "sorry to see you unlike the post" });
            } else {
                errors.notfound = `cannot find post by id:${
                    req.params.post_id
                }`;
                return res.status(400).json(errors);
            }
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }

    /*
    @desc add comment to post by id
    @access private
    @route /api/post/comment/:post_id
    */
    async addComment(req, res) {
        const errors = {};
        const payload = _.pick(req.body, ["text", "name"]);
        payload.avatar = gravatar.url(payload.email, {
            s: "200",
            r: "pg",
            d: "mm"
        });
        // the same user can add more then one comment.
        payload.user = req.user.id;
        try {
            const result = await post.findById(req.params.post_id);
            if (!result) {
                errors.notfound = `cannot find the post by id:${
                    req.params.post_id
                }`;
                return res.status(404).json(errors);
            }
            result.comments.unshift(payload);
            await result.save();
            return res.status(200).json(result);
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }

    /*
    @desc add comment to post by id
    @access private
    @route /api/post/:post_id/comment/:cmnt_id
    */
    async editComment(req, res) {
        const errors = {};
        const payload = _.pick(req.body, ["text", "name"]);
        try {
            const result = await post.findById(req.params.post_id);
            if (!result) {
                errors.notfound = `cannot find the post by id:${
                    req.params.post_id
                }`;
                return res.status(404).json(errors);
            }
            // you cannot delete or edit other people's comment
            const idx = result.comments.findIndex(
                comment =>
                    comment.user.toString() === req.user.id &&
                    comment.id.toString() === req.params.comment_id
            );
            if (idx !== -1) {
                result.comments[idx].text = payload.text;
                result.comments[idx].name = payload.name;
                await result.save();
                return res.status(200).json(result);
            } else {
                errors.notfound = `cannot find the comment for post by id:${
                    req.params.comment_id
                }`;
                return res.status(404).json(errors);
            }
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }

    /*
    @desc add comment to post by id
    @access private
    @route /api/post/:post_id/comment/:cmnt_id
    */
    async deleteComment(req, res) {
        const errors = {};
        try {
            const result = await post.findById(req.params.post_id);
            if (!result) {
                errors.notfound = `cannot find the post by id:${
                    req.params.post_id
                }`;
                return res.status(404).json(errors);
            }
            // you cannot delete or edit other people's comment
            const idx = result.comments.findIndex(
                comment =>
                    comment.user.toString() === req.user.id &&
                    comment.id.toString() === req.params.comment_id
            );
            if (idx !== -1) {
                result.comments.splice(idx, 1);
                await result.save();
                return res.status(200).json(result);
            } else {
                errors.notfound = `cannot find the comment for post by id:${
                    req.params.comment_id
                }`;
                return res.status(404).json(errors);
            }
        } catch (err) {
            errors.unknown = err;
            return res.status(400).json(errors);
        }
    }
}
export default PostController;
