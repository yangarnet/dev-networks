import config from "./settings.json";
import mongoose from "mongoose";
import middlewareConfig from "../middleware/config";
import routeConfig from "../routes/route-config";

const envConfig = env => {
    const currentEnv = config[env];
    // for dev and test env
    if (currentEnv) {
        Object.keys(currentEnv).forEach(key => {
            process.env[key] = currentEnv[key];
        });
    }
    mongoose.connect(process.env.MONGODB_URL).then(
        () => {
            console.log("you are connected to mongodb!");
        },
        err => {
            console.log("[Sorry] - mongodb connection error");
        }
    );
};

const serverConfig = server => {
    const dev = "development";
    const env = process.env.NODE_ENV || dev;
    envConfig(env);
    middlewareConfig(server);
    routeConfig(server);
};

export default serverConfig;
