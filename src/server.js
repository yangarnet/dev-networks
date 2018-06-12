import express from 'express';
import envConfig from './config/env-config';
import middlewareConfig from './middleware/config';
import routeConfig from './routes/route-config';

const dev = 'development';
const env = process.env.NODE_ENV || dev;
const server = express();

envConfig(env);
middlewareConfig(server);
routeConfig(server);

server.get('/demo', (req, res) => {
    res.status(200).json({ greeting: 'hello' });
});

server.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default server;
