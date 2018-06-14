import express from 'express';
import serverConfig from './config/server-config';

const server = express();
serverConfig(server);

server.get('/', (req, res) => {
    res.status(200).json({ greeting: 'hello', env: process.env.NODE_ENV });
});

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
