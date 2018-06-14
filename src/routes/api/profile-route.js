import express from 'express';
import passport from 'passport';
import ProfileController from '../../controllers/profile';

const profileRoute = () => {

    const profileRouter = express.Router();
    const profileController = new ProfileController();

    profileRouter.get('/handle/:handle', profileController.getProfileByHandle);
    profileRouter.get('/id/:id', profileController.getProfileById);
    profileRouter.get('/all', profileController.listAllProfile);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    profileRouter.get('/', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.getCurrentUserProfile);
    profileRouter.post('/', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.addUserProfile);
    profileRouter.put('/', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.updateUserProfile);
    profileRouter.delete('/', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.deleteUserProfile);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    profileRouter.post('/experience', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.addExperienceForProfile);
    profileRouter.put('/experience/:exp_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.updateExperienceForProfile);
    profileRouter.delete('/experience/:exp_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.deleteExperienceFromProfile);

    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    profileRouter.post('/education', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.addEducationForProfile);
    profileRouter.put('/education/:edu_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.updateEducationForProfile);
    profileRouter.delete('/education/:edu_id', passport.authenticate(process.env.AUTH_TYPE, { session: false }), profileController.deleteEducationFromProfile);

    return profileRouter;

};
export default profileRoute;
