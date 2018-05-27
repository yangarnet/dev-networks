import express from "express";
import ProfilesModel from "../../models/ProfilesModel";
import UserModel from "../../models/UserModel";
import passport from "passport";
import mongoose from "mongoose";
import _ from "lodash";
import validateNewProfiles from "../../validation/Profiles";
import isEmpty from '../../validation/IsEmpty';

const profilesRouter = express.Router();

// a public route without the need to login
profilesRouter.get("/handle/:handle", async (req, res) => {
  const error = {};
  try {
    const profile = await ProfilesModel.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']);
    if (profile) {
      return res.status(200).json(profile);
    } else {
      error.notfound = `cannot find any profile with handle: ${req.params.handle}`;
      res.status(404).json(error);
    }
  } catch (err) {
    error.cannot = 'cannot perform mongo db search';
    res.status(400).json(error);
  }
});
profilesRouter.get("/id/:id", async (req, res) => {
  const error = {};
  try {
    const profile = await ProfilesModel.findById(req.params.id).populate('user', ['name', 'avatar']);
    if (profile) {
      return res.status(200).json(profile);
    } else {
      error.notfound = `cannot find any profile by id: ${req.params.id}`;
      res.status(404).json(error);
    }
  } catch (err) {
    error.cannot = 'cannot perform mongo db search';
    res.status(400).json(error);
  }
});

profilesRouter.get("/all", async (req, res) => {
  const error = {};
  try {
    const profiles = await ProfilesModel.find().populate('user', ['name', 'avatar']);
    if (profiles) {
      res.status(200).json(profiles);
    } else {
      error.none = 'there is not any profile';
      res.status(200).json(error);
    }
  } catch (err) {

  }
});

// below are the private url
profilesRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const errors = {};
  try {
    const profile = await ProfilesModel.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    console.log(`req userid :${req.user.id}`);
    if (!profile) {
      errors.notfound = "no profile for the user";
      return res.status(404).json(errors);
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json(err);
  }
});

profilesRouter.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { errors, isValid } = validateNewProfiles(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status", "skills", "bio", "githubusername"]);
  try {
    const profile = await ProfilesModel.findOne({ user: req.user.id });
    if (profile) {
      errors.unable = 'user profile already exists';
      return res.status(400).json(errors);
    } else {
      payloads.user = req.user.id;
      if (payloads.skills) { payloads.skills = payloads.skills.split(',') };
      payloads.dateAdded = Date.now();
      const newProfle = new ProfilesModel(payloads);
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

// this still more work to do here in the update routes.  
profilesRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};
  const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status",
    "skills", "bio", "githubusername", "social", "education", "experiences"]);
  if (payloads.skills) { payloads.skills = payloads.skills.split(',') };
  try {
    const profile = await ProfilesModel.findOne({ user: req.user.id });
    if (profile) {
      const payloadToUpdate = setProfilesToUpdate(payloads, profile);
      const updatedProfiles = await ProfilesModel.findOneAndUpdate({ user: req.user.id }, { $set: payloadToUpdate }, { new: true });
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

function setProfilesToUpdate(payload, currentProfile) {
  return {
    handle: !isEmpty(payload.handle) ? payload.handle : currentProfile.handle,
    company: !isEmpty(payload.company) ? payload.company : currentProfile.company,
    webSite: !isEmpty(payload.webSite) ? payload.webSite : currentProfile.webSite,
    location: !isEmpty(payload.location) ? payload.location : currentProfile.location,
    status: !isEmpty(payload.status) ? payload.status : currentProfile.status,
    skills: !isEmpty(payload.status) ? currentProfile.skills.concat(payload.skills) : currentProfile.skills,
    bio: !isEmpty(payload.bio) ? payload.bio : currentProfile.bio,
    githubusername: !isEmpty(payload.githubusername) ? payload.githubusername : currentProfile.githubusername,
    experiences: !isEmpty(payload.experiences) ? currentProfile.experiences.concat(payload.experiences) : currentProfile.experiences,
    education: !isEmpty(payload.education) ? currentProfile.education.concat(payload.education) : currentProfile.education,
    social: Object.assign(currentProfile.social, payload.social),// merge two objects into one
    lastUpdated: Date.now()
  }
}

export default profilesRouter;