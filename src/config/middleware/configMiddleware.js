import passport from "passport";
import bodyParser from "body-parser";
import passportConfig from "../env/Passport";

const configMiddleware = app => {
  // body parse
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // config login passport
  app.use(passport.initialize());
  passportConfig(passport);
};

export default configMiddleware;
