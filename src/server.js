import express from 'express';
import envConfig from './config/env-config';
import middlewareConfig from './middleware/config';
import routeConfig from './routes/route-config';

const dev = 'development';
const env = process.env.NODE_ENV || dev;
const app = express();

envConfig(env);
middlewareConfig(app);
routeConfig(app);

app.get('/', (req, res) => {
    res.status(200).send('hello');
});

app.listen(process.env.PORT, () => {
    console.log(`server running @ port: ${process.env.PORT}`);
});

export default app;
