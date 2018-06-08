
import userRoute from './api/user-route';
import profileRoute from './api/profile-route';
import postRoute from './api/post-route';

// root route config begins here
const routeConfig = app => {
    app.use('/api/user', userRoute);
    app.use('/api/profile', profileRoute);
    app.use('/api/post', postRoute);
};

export default routeConfig;
