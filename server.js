import express from "express";
import serverConfig from "./src/config/server-config";
import renderClient from "./client-render";

const server = express();
serverConfig(server);
renderClient(server);

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
