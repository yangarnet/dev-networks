import config from "./settings.json";
import mongoose from "mongoose";
import middlewareConfig from "../middleware/config";
import routeConfig from "../routes/route-config";

const envConfig = async env => {
    const currentEnv = config[env];
    if (currentEnv) {
        Object.keys(currentEnv).forEach(key => {
            process.env[key] = currentEnv[key];
        });
    }
    try {
        const result = await mongoose.connect(
            process.env.MONGODB_URL,
            { useNewUrlParser: true }
        );
        console.log("you are connected to mongodb!");
    } catch (error) {
        console.log(`[Sorry] - mongodb connection error:${error}`);
    }
};

const serverConfig = server => {
    const dev = "development";
    const env = process.env.NODE_ENV || dev;
    envConfig(env);
    middlewareConfig(server);
    routeConfig(server);
};

export default serverConfig;
