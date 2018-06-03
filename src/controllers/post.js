import express from 'express';
import passport from 'passport';
import post from '../models/post';

const postRouter = express.Router();
/*
@route POST api/post/
@desc add new post
@access private authentication required
*/
postRouter.post('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    // pull in validation first
});


export default postRouter;
