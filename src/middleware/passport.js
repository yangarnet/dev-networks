import passportJWT from 'passport-jwt';
import mongoose from 'mongoose';
import user from '../models/user';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const passportConfig = passport => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    // passport stores the user object in session by default
    // JWT : helps identified logged in user with passing around encrypted token in requests, instead of
    // storing user in the session on the server and creating a cookie
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const result = await user.findById(jwt_payload.id);
                if (result) {
                    return done(null, result);
                }
            } catch (e) {
                console.log(e);
                return done(e, null);
            }
        })
    );
};

export default passportConfig;
