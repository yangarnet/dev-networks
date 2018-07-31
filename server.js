import express from "express";
import serverConfig from "./src/config/server-config";

const server = express();
serverConfig(server);

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
