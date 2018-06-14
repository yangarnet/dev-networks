import express from 'express';
import passport from 'passport';
import PostController from '../../controllers/post';

const postRoute = () => {
    const postRouter = express.Router();
    const postController = new PostController();

    postRouter.get('/', postController.fetchAllPosts);
    postRouter.get('/:post_id', postController.fetchPostById);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    postRouter.post('/', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.addNewPost);
    postRouter.put('/:post_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.editPostById);
    postRouter.delete('/:post_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.deletePostById);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    postRouter.post('/like/:post_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.likePostById);
    postRouter.put('/unlike/:post_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.unlikePostById);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    postRouter.post('/comment/:post_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.addComment);
    postRouter.put('/:post_id/comment/:comment_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.editComment);
    postRouter.delete('/:post_id/comment/:comment_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), postController.deleteComment);

    return postRouter;
};
export default postRoute;
