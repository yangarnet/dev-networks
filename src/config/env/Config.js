import config from "./Config.json";
import mongoose from "mongoose";

const mongoDb = {
  production: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${
    process.env.MONGODB
  }`
};

const envConfig = env => {
  const currentEnv = config[env];
  // for dev and test env
  if (currentEnv) {
    Object.keys(currentEnv).forEach(key => {
      process.env[key] = currentEnv[key];
    });
  }

  mongoose.connect(mongoDb[env] || process.env.MONGODB_URL).then(
    () => {
      console.log("you are connected to mongodb!");
    },
    err => {
      console.log("[Sorry] - mongodb connection error");
    }
  );
};

export default envConfig;
