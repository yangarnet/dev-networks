import express from 'express';
import user from '../../models/user';
import _ from 'lodash';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validateRegisterInput from '../../validation/user-register';
import validateUserLogin from '../../validation/user-login';

// with the router object we can now define routes below.
const userRouter = express.Router();

/*
@user registration
*/
userRouter.post('/register', async (req, res) => {
    const payload = _.pick(req.body, ['name', 'email', 'password', 'confirmedPassword']);

    const result = validateRegisterInput(payload);
    if (!result.isValid) {
        // return and end the response
        return res.status(400).json(result.errors);
    }
    const avatar = gravatar.url(payload.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    try {
        const result = await user.findOne({ email: payload.email });
        if (result) {
            throw new Error(`Error: email ${result.email} already registered`);
        } else {
            const newUser = new user({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                avatar
            });
            try {
                // password hashing takes place in UserSchema.pre('save', next)
                const result = await newUser.save();
                res.status(200).json({
                    user: {
                        name: result.name,
                        email: result.email
                    }
                });
            } catch (e) {
                res.status(500).send(e.message);
            }
        }
    } catch (exception) {
        res.status(400).json({
            name: exception.name,
            msg: exception.message
        });
    }
});

/*
user login
*/
userRouter.post('/login', async (req, res) => {
    const payload = _.pick(req.body, ['email', 'password']);
    const { errors, isValid } = validateUserLogin(payload);

    try {
        // user logs in by email and password.
        const result = await user.findOne({ email: payload.email });
        if (!result) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
        // compare the user input pwd with hashed password.
        const isMatch = bcrypt.compareSync(payload.password, result.password);
        if (isMatch) {
            const tokenPayload = {
                id: result.id,
                name: result.name,
                avatar: result.avatar
            };

            // now sign the token after success login, this is the key to verify all other authorized req.
            const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '3h' });
            if (token) {
                return res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`
                });
            } else {
                errors.genToken = 'Errors occurs when generation the token';
                return res.status(500).json(errors);
            }
        } else {
            errors.password = 'invalid password';
            return res.status(400).json(errors);
        }
    } catch (err) {
        return res.status(404).json(errors);
    }
});
console.log(JSON.stringify(process.env, null, 3));
userRouter.get('/current-user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        userId: req.user.id,
        userEmail: req.user.email,
        userName: req.user.name
    });
});


export default userRouter;
