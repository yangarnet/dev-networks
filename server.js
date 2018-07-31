import express from "express";
import path from "path";
import serverConfig from "./src/config/server-config";

const server = express();
serverConfig(server);
// react node full stack, serve react resource
if (process.env.NODE_ENV === "production") {
    server.use(express.static("client/build"));
    server.get("/service-worker.js", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "client", "build", "service-worker.js")
        );
    });
    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
