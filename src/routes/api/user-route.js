import express from 'express';
import passport from 'passport';
import UserController from '../../controllers/user';

const userRoute = express.Router();
const userCtrl = new UserController();

userRoute.post('/register', userCtrl.register);
userRoute.post('/login', userCtrl.login);
// store the logged in user in request, NOT in session, by { session: false }
// client will store the token and sends it back each subsequent request
userRoute.get('/current-user', passport.authenticate('jwt', { session: false }), userCtrl.getCurrentUser);

export default userRoute;
