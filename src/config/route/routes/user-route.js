import express from 'express';
import passport from 'passport';
import UserController from '../../../controllers/user'

const userRoute = express.Router();
const userCtrl = new UserController();

userRoute.post('/register', userCtrl.register);
userRoute.post('/login', userCtrl.login);
userRoute.get('/current-user', passport.authenticate('jwt', { session: false }), userCtrl.getCurrentUser);

export default userRoute;
