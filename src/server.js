import express from "express";
import path from "path";
import serverConfig from "./config/server-config";

const server = express();
serverConfig(server);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    server.use(express.static("../client/build"));

    server.get("/service-worker.js", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "service-worker.js")
        );
    });

    server.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "index.html")
        );
    });
}

server.get("/", (req, res) => {
    res.status(200).json({ greeting: "hello", env: process.env.NODE_ENV });
});

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
