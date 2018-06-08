import express from 'express';
import passport from 'passport';
import PostController from '../../controllers/post';

const postRoute = express.Router();
const postController = new PostController();

postRoute.get('/', postController.fetchAllPosts);
postRoute.get('/:post_id', postController.fetchPostById);

postRoute.post('/', passport.authenticate('jwt', { session: false }), postController.addNewPost);
postRoute.put('/:post_id', passport.authenticate('jwt', { session: false }), postController.editPostById);
postRoute.delete('/:post_id', passport.authenticate('jwt', { session: false }), postController.deletePostById);

postRoute.post('/like/:post_id', passport.authenticate('jwt', { session: false }), postController.likePostById);
postRoute.put('/unlike/:post_id', passport.authenticate('jwt', { session: false }), postController.unlikePostById);

postRoute.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), postController.addComment);
postRoute.put('/:post_id/comment/:comment_id', passport.authenticate('jwt', { session: false }), postController.editComment);
postRoute.delete('/:post_id/comment/:comment_id', passport.authenticate('jwt', { session: false }), postController.deleteComment);

export default postRoute;
