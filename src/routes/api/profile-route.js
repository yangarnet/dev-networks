import express from 'express';
import passport from 'passport';
import ProfileController from '../../controllers/profile';

const profileRoute = express.Router();
const profileController = new ProfileController();

profileRoute.get('/handle/:handle', profileController.getProfileByHandle);
profileRoute.get('/id/:id', profileController.getProfileById);
profileRoute.get('/all', profileController.listAllProfile);

// store the logged in user in request, NOT in session, by { session: false }
// client will store the token and sends it back each subsequent request
profileRoute.get('/', passport.authenticate('jwt', { session: false }), profileController.getCurrentUserProfile);
profileRoute.post('/', passport.authenticate('jwt', { session: false }), profileController.addUserProfile);
profileRoute.put('/', passport.authenticate('jwt', { session: false }), profileController.updateUserProfile);
profileRoute.delete('/', passport.authenticate('jwt', { session: false }), profileController.deleteUserProfile);

// store the logged in user in request, NOT in session, by { session: false }
// client will store the token and sends it back each subsequent request
profileRoute.post('/experience', passport.authenticate('jwt', { session: false }), profileController.addExperienceForProfile);
profileRoute.put('/experience/:exp_id', passport.authenticate('jwt', { session: false }), profileController.updateExperienceForProfile);
profileRoute.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), profileController.deleteExperienceFromProfile);

// store the logged in user in request, NOT in session, by { session: false }
// client will store the token and sends it back each subsequent request
profileRoute.post('/education', passport.authenticate('jwt', { session: false }), profileController.addEducationForProfile);
profileRoute.put('/education/:edu_id', passport.authenticate('jwt', { session: false }), profileController.updateEducationForProfile);
profileRoute.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), profileController.deleteEducationFromProfile);


export default profileRoute;
