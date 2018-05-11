import config from "./Config.json";
import dbUser from "./DbUser.json";

import mongoose from "mongoose";

// for prod, I don't want to input my CC in heroku
const user = dbUser.user;
const password = dbUser.password;

const mongoDb = {
  production: `mongodb://${user}:${password}@ds161539.mlab.com:61539/mymongodb`
};

const envConfig = env => {
  const currentEnv = config[env];
  if (currentEnv) {
    Object.keys(currentEnv).forEach(key => {
      process.env[key] = currentEnv[key];
    });
  }

  mongoose.connect(mongoDb[env] || process.env.MONGODB_URL).then(
    () => {
      console.log("you are connected!");
    },
    err => {
      console.log("[Sorry] - mongodb connection error");
    }
  );
};

export default envConfig;
