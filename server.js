"use strict";
import express from "express";
import routeConfig from "./src/config/routeConfig";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

// db connection config

// config routes
routeConfig(app);

app.listen(PORT, () => {
  console.log(`server running @ port: ${PORT}`);
});
