import path from "path";
import express from "express";

const renderClient = app => {
    // react node full stack, serve react resource
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        app.get("/service-worker.js", (req, res) => {
            res.sendFile(
                path.resolve(__dirname, "client", "build", "service-worker.js")
            );
        });
        app.get("*", (req, res) => {
            res.sendFile(
                path.resolve(__dirname, "client", "build", "index.html")
            );
        });
    }
};

export default renderClient;
