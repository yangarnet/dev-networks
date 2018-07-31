import express from "express";
import path from "path";
import userRoute from "./api/user-route";
import profileRoute from "./api/profile-route";
import postRoute from "./api/post-route";

// root route config begins here
const routeConfig = app => {
    // react node full stack, serve react resource
    if (process.env.NODE_ENV === "production") {
        // Set static folder
        app.use(express.static("../../client/build"));
        app.get("/service-worker.js", (req, res) => {
            res.sendFile(
                path.resolve(
                    __dirname,
                    "../../client",
                    "build",
                    "service-worker.js"
                )
            );
        });
        app.get("*", (req, res) => {
            res.sendFile(
                path.resolve(__dirname, "../../client", "build", "index.html")
            );
        });
    }
    app.use("/api/user", userRoute());
    app.use("/api/profile", profileRoute());
    app.use("/api/post", postRoute());
};

export default routeConfig;
