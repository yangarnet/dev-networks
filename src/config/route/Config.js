
import userRoute from './routes/user-route';
import profileRoute from './routes/profile-route';
import postRoute from './routes/post-route';

// root route config begins here
const routeConfig = app => {
    app.use('/api/user', userRoute);
    app.use('/api/profile', profileRoute);
    app.use('/api/post', postRoute);
};

export default routeConfig;
