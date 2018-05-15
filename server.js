"use strict";
import express from "express";
import envConfig from "./src/config/env/Config";
import configMiddleware from "./src/config/middleware/configMiddleware";
import routeConfig from "./src/config/route/Config";
const dev = "development";
const env = process.env.NODE_ENV || dev;
const app = express();

envConfig(env);
configMiddleware(app);
routeConfig(app);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`server running @ port: ${process.env.PORT}`);
});
