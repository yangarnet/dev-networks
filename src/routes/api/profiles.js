import express from "express";
import profile from "../../models/profile";
import user from "../../models/user";
import passport from "passport";
import mongoose from "mongoose";
import _ from "lodash";
import validateNewProfiles from "../../validation/profiles";
import setProfilesToUpdate from './helper';

const profilesRouter = express.Router();

/*
@route /api/profile/handle/:handlename
@desc return user profile by handle name
@access public
*/
profilesRouter.get("/handle/:handle", async (req, res) => {
    const error = {};
    try {
        const result = await profile.findOne({
            handle: req.params.handle
        }).populate('user', ['name', 'avatar']);
        if (result) {
            return res.status(200).json(result);
        } else {
            error.notfound = `cannot find any profile with handle: ${req.params.handle}`;
            res.status(404).json(error);
        }
    } catch (err) {
        error.cannot = 'cannot perform mongo db search';
        res.status(400).json(error);
    }
});

/*
@route /api/profile/id/:id
@desc return user profile by profile id
@access public
*/
profilesRouter.get("/id/:id", async (req, res) => {
    const error = {};
    try {
        // the populate method is used to fetch details from ref defined in the profile schema
        const result = await profile.findById(req.params.id).populate('user', ['name', 'avatar']);
        if (result) {
            return res.status(200).json(result);
        } else {
            error.notfound = `cannot find any profile by id: ${req.params.id}`;
            res.status(404).json(error);
        }
    } catch (err) {
        error.cannot = 'cannot perform mongo db search';
        res.status(400).json(error);
    }
});

/*
@route /api/profile/all
@desc return all existing profiles of users
@access public
*/
profilesRouter.get("/all", async (req, res) => {
    const error = {};
    try {
        const profiles = await profile.find().populate('user', ['name', 'avatar']);
        if (profiles) {
            res.status(200).json(profiles);
        } else {
            error.none = 'there is not any profile';
            res.status(200).json(error);
        }
    } catch (err) {

    }
});

/*
@route /api/profile
@desc get full profile information for login user
@access private
*/
profilesRouter.get("/", passport.authenticate("jwt", {
    session: false
}), async (req, res) => {
    const errors = {};
    try {
        const result = await profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);
        console.log(`req userid :${req.user.id}`);
        if (!result) {
            errors.notfound = "no profile for the user";
            return res.status(404).json(errors);
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json(err);
    }
});

/*
@route /api/profile
@desc add new profile for login user
@access private
*/
profilesRouter.post("/", passport.authenticate("jwt", {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validateNewProfiles(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status", "skills", "bio", "githubusername", "social"]);
    try {
        if (await profile.findOne({
                user: req.user.id
            })) {
            errors.unable = 'user profile already exists';
            return res.status(400).json(errors);
        } else {
            payloads.user = req.user.id;
            if (payloads.skills) {
                payloads.skills = payloads.skills.split(',')
            };
            payloads.dateAdded = Date.now();
            const newProfle = new profile(payloads);
            const result = await newProfle.save();
            if (result) {
                return res.status(201).json(result);
            } else {
                errors.cannotsave = "fail to save new user profles";
                res.status(400).json(errors);
            }
        }
    } catch (err) {
        res.status(404).json(err);
    }
});

/*
@route api/profile
@desc update experience to user profile
@access private
*/
profilesRouter.put('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const errors = {};
    const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status", "skills", "bio", "githubusername", "social"]);
    if (payloads.skills) {
        payloads.skills = payloads.skills.split(',')
    };
    try {
        const result = await profile.findOne({
            user: req.user.id
        });
        if (result) {
            const payloadToUpdate = setProfilesToUpdate(payloads, result);
            const updatedProfiles = await profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: payloadToUpdate
            }, {
                new: true
            });
            if (updatedProfiles) {
                return res.status(200).json(updatedProfiles);
            } else {
                errors.cannotupdate = 'fail to update user profile';
                return res.status(400).json(errors);
            }
        }
    } catch (err) {
        errors.notfound = 'user profile not found';
        return res.status(404).json(err);
    }
});

/*
@route api/profile
@desc delete user and linked profile
@access private
*/
profilesRouter.delete('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const error = {};
    try {
        if (await profile.findOneAndRemove({
                user: req.user.id
            }) && await user.findByIdAndRemove(req.user.id)) {
            return res.status(200).json({
                status: 'success'
            });
        } else {
            error.notfound = 'cannot found any profile';
            return res.status(404).json(error);
        }
    } catch (err) {
        error.cannot = 'cannot delete user and linked profile';
        res.status(400).json(error);
    }
});

/*
@route api/profiles/experience
@desc add experience to user profile
@access private
*/

profilesRouter.post('/experience', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});

/*
@route api/profiles/experience
@desc update experience to user profile
@access private
*/

profilesRouter.put('/experience', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});

/*
@route api/profiles/experience/:exp_id
@desc delete experience from user profile
@access private
*/

profilesRouter.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});


/*
@route api/profiles/education
@desc add education to user profile
@access private
*/

profilesRouter.post('/education', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});


/*
@route api/profiles/education
@desc update education to user profile
@access private
*/

profilesRouter.put('/education', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});

/*
@route api/profiles/education/:edu_id
@desc delete education from user profile
@access private
*/

profilesRouter.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {});


export default profilesRouter;
