import passport from 'passport-jwt';
import mongoose from 'mongoose';
import user from '../../models/user';

const JwtStrategy = passport.Strategy;
const ExtractJwt = passport.ExtractJwt;

const passportConfig = passport => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
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
