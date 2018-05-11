"use strict";
import express from "express";
import routeConfig from "./src/config/route/Config";
import bodyParser from "body-parser";
import envConfig from "./src/config/env/Config";

const dev = "development";
const env = process.env.NODE_ENV || dev;
const app = express();

// config middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// env config
envConfig(env);
// config routes
routeConfig(app);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`server running @ port: ${process.env.PORT}`);
});
