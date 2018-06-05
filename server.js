import express from 'express';
import envConfig from './src/config/env/config';
import middlewareConfig from './src/config/middleware/config';
import routeConfig from './src/config/route/config';
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
