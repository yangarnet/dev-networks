import passport from "passport-jwt";
import mongoose from "mongoose";
import UserModel from "../../../src/models/UserModel";

const JwtStrategy = passport.Strategy;
const ExtractJwt = passport.ExtractJwt;

const passportConfig = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await UserModel.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
      } catch (e) {
        console.log(e);
        return done(e, null);
      }
    })
  );
};

export default passportConfig;
