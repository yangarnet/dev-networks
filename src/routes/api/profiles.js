import express from "express";
import ProfilesModel from "../../models/ProfilesModel";
import UserModel from "../../models/UserModel";
import passport from "passport";
import mongoose from "mongoose";
import _ from "lodash";
import validateNewProfiles from "../../validation/Profiles";

const profilesRouter = express.Router();


profilesRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const errors = {};
  try {
    const profile = await ProfilesModel.findOne({ user: req.user.id });
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

  const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status", "skills", "bio", "githubusername", "social"]);
  try {
    const profile = await ProfilesModel.findOne({ user: req.user.id });
    if (profile) {
      errors.unable = 'user profile already exists';
      return res.status(400).json(errors);
    } else {
      const newProfle = new ProfilesModel({});
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

profilesRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateNewProfiles(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const payloads = _.pick(req.body, ["handle", "company", "webSite", "location", "status", "skills", "bio", "githubusername", "social"]);
  try {
    const updatedProfiles = await ProfilesModel.findByIdAndUpdate({ user: req.user.id }, { $set: payloads }, { new: true });
    if (updatedProfiles) {
      return res.status(200).json(updatedProfiles);
    } else {
      errors.notfound = 'user profile not found';
      return res.status(404).json(errors);
    }
  } catch (err) {
    res.status(404).json(err);
  }
});


export default profilesRouter;