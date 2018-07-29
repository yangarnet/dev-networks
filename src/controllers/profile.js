import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import profile from "../models/profile";
import validateNewProfiles from "../validation/profile";
import validateExperience from "../validation/experience";
import validateEducation from "../validation/education";
import {
    setProfilesToUpdate,
    updateExperienceForProfile,
    updateEducationForProfile,
    deleteFromProfile,
    joinStringWithHyphen
} from "./helper/helper";

class ProfileController {
    /*
    @route /api/profile/handle/:handlename
    @desc return user profile by handle name
    @access public
    */
    async getProfileByHandle(req, res) {
        const error = {};
        try {
            const result = await profile
                .findOne({ handle: req.params.handle })
                .populate("user", ["name", "avatar"]);
            if (result) {
                return res.status(200).json(result);
            } else {
                error.notfound = `cannot find any profile with handle: ${
                    req.params.handle
                }`;
                return res.status(404).json(error);
            }
        } catch (err) {
            error.cannot = "cannot perform mongo db search";
            return res.status(400).json(error);
        }
    }
    /*
    @route /api/profile/id/:id
    @desc return user profile by profile id
    @access public
    */
    async getProfileById(req, res) {
        const error = {};
        try {
            // the populate method is used to fetch details from ref defined in the profile schema
            const result = await profile
                .findById(req.params.id)
                .populate("user", ["name", "avatar"]);
            if (result) {
                return res.status(200).json(result);
            } else {
                error.notfound = `cannot find any profile by id: ${
                    req.params.id
                }`;
                res.status(404).json(error);
            }
        } catch (err) {
            error.cannot = "invalid id";
            res.status(400).json(error);
        }
    }
    /*
    @route /api/profile/all
    @desc return all existing profiles of users
    @access public
    */
    async listAllProfile(req, res) {
        const error = {};
        try {
            const profiles = await profile
                .find()
                .populate("user", ["name", "avatar"]);
            if (profiles) {
                res.status(200).json(profiles);
            } else {
                error.none = "there is not any profile";
                res.status(200).json(error);
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
    /*
    @route /api/profile
    @desc get full profile information for login user
    @access private
    */
    async getCurrentUserProfile(req, res) {
        const errors = {};
        try {
            const result = await profile
                .findOne({ user: req.user.id })
                .populate("user", ["name", "avatar"]);
            console.log(`req userid :${req.user.id}`);
            if (!result) {
                return res.status(200).json({});
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json(err);
        }
    }
    /*
    @route /api/profile
    @desc add new profile for login user
    @access private
    */
    async addUserProfile(req, res) {
        const { errors, isValid } = validateNewProfiles(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const payloads = _.pick(req.body, [
            "handle",
            "company",
            "webSite",
            "location",
            "status",
            "skills",
            "bio",
            "githubusername",
            "facebook",
            "twitter",
            "youtube",
            "instagram",
            "linkedIn"
        ]);
        try {
            if (await profile.findOne({ user: req.user.id })) {
                errors.unable = "user profile already exists";
                return res.status(400).json(errors);
            } else {
                payloads.user = req.user.id;
                if (typeof payloads.skills === "string") {
                    payloads.skills = payloads.skills.split(",");
                }
                payloads.social = {
                    facebook: payloads.facebook,
                    twitter: payloads.twitter,
                    linkedIn: payloads.linkedIn,
                    youtube: payloads.youtube,
                    instagram: payloads.instagram
                };
                payloads.handle = joinStringWithHyphen(payloads.handle);
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
    }
    /*
    @route api/profile
    @desc update experience to user profile
    @access private
    */
    async updateUserProfile(req, res) {
        const errors = {};
        const payloads = _.pick(req.body, [
            "handle",
            "company",
            "webSite",
            "location",
            "status",
            "skills",
            "bio",
            "githubusername",
            "facebook",
            "twitter",
            "youtube",
            "instagram",
            "linkedIn"
        ]);
        try {
            const result = await profile.findOne({ user: req.user.id });
            if (result) {
                const payloadToUpdate = setProfilesToUpdate(payloads, result);
                const updatedProfiles = await profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: payloadToUpdate },
                    { new: true }
                );
                if (updatedProfiles) {
                    return res.status(200).json(updatedProfiles);
                } else {
                    errors.cannotupdate = "fail to update user profile";
                    return res.status(400).json(errors);
                }
            }
        } catch (err) {
            errors.notfound = "user profile not found";
            return res.status(404).json(err);
        }
    }

    /*
    @route api/profile
    @desc delete user and linked profile
    @access private
    */
    async deleteUserProfile(req, res) {
        const error = {};
        try {
            if (
                (await profile.findOneAndRemove({ user: req.user.id })) &&
                (await user.findByIdAndRemove(req.user.id))
            ) {
                return res.status(200).json({
                    status: "success"
                });
            } else {
                error.notfound = "cannot found any profile";
                return res.status(404).json(error);
            }
        } catch (err) {
            error.cannot = "cannot delete user and linked profile";
            res.status(400).json(error);
        }
    }
    /*
    @route api/profiles/experience
    @desc add new experience to user profile
    @access private
    */
    async addExperienceForProfile(req, res) {
        const payload = _.pick(req.body, [
            "title",
            "company",
            "location",
            "from",
            "to",
            "current",
            "description"
        ]);
        const { errors, isValid } = validateExperience(payload);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (userProfile) {
                userProfile.experiences.unshift(payload);
                const newProfle = await profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: userProfile },
                    { new: true }
                );
                if (newProfle) {
                    return res.status(200).json(newProfle);
                } else {
                    errors.cannot = `cannot add new experience for user: ${
                        req.user.id
                    }`;
                    res.status(400).json(errors);
                }
            } else {
                errors.notfound = "user profile not found";
                return res.status(404).json(errors);
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
    /*
    @route api/profiles/experience
    @desc update experience by id to user profile
    @access private
    */
    async updateExperienceForProfile(req, res) {
        const payload = _.pick(req.body, [
            "title",
            "company",
            "location",
            "from",
            "to",
            "current",
            "description"
        ]);
        payload.id = req.params.exp_id;
        const { errors, isValid } = validateExperience(payload);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (!userProfile) {
                errors.notfound = `user profile not found for id:${
                    req.user.id
                }`;
                return res.status(404).json(errors);
            } else {
                updateExperienceForProfile(userProfile.experiences, payload);
                const newExperience = await userProfile.save();
                if (newExperience) {
                    return res.status(200).json(newExperience);
                } else {
                    errors.cannot = "cannot update experience for user";
                    return res.status(400).json(errors);
                }
            }
        } catch (err) {
            errors.notfound = `cannot find user by id: ${req.user.id}`;
            res.status(404).json(errors);
        }
    }
    /*
    @route api/profiles/experience/:exp_id
    @desc delete experience from user profile
    @access private
    */
    async deleteExperienceFromProfile(req, res) {
        const errors = {};
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (!userProfile) {
                errors.notfound = `user profile not found for id:${
                    req.user.id
                }`;
                return res.status(404).json(errors);
            } else {
                const deleted = deleteFromProfile(
                    userProfile.experiences,
                    req.params.exp_id
                );
                if (deleted) {
                    await userProfile.save();
                    deleted.status = "deleted exp success";
                    return res.status(200).json(userProfile);
                } else {
                    errors.cannot = "cannot delete experience for user";
                    return res.status(400).json(errors);
                }
            }
        } catch (err) {
            errors.notfound = `cannot find user by id: ${req.user.id}`;
            return res.status(404).json(errors);
        }
    }
    /*
    @route api/profiles/education
    @desc add education to user profile
    @access private
    */
    async addEducationForProfile(req, res) {
        const payload = _.pick(req.body, [
            "school",
            "degree",
            "fieldOfStudy",
            "from",
            "to",
            "current",
            "description"
        ]);
        const { errors, isValid } = validateEducation(payload);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (userProfile) {
                userProfile.education.unshift(payload);
                const newProfle = await userProfile.save();
                if (newProfle) {
                    return res.status(200).json(newProfle);
                } else {
                    errors.cannot = `cannot add new education for user: ${
                        req.user.id
                    }`;
                    return res.status(400).json(errors);
                }
            } else {
                errors.notfound = "user profile not found";
                return res.status(404).json(errors);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    /*
    @route api/profiles/education
    @desc update education to user profile
    @access private
    */
    async updateEducationForProfile(req, res) {
        const payload = _.pick(req.body, [
            "school",
            "degree",
            "fieldOfStudy",
            "from",
            "to",
            "current",
            "description"
        ]);
        payload.id = req.params.edu_id;
        const errors = {};
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (!userProfile) {
                errors.notfound = `user profile not found for id:${
                    req.user.id
                }`;
                return res.status(404).json(errors);
            } else {
                updateEducationForProfile(userProfile.education, payload);
                const newEducation = await userProfile.save();
                if (newEducation) {
                    return res.status(200).json(newEducation);
                } else {
                    errors.cannot = "cannot update education for user";
                    return res.status(400).json(errors);
                }
            }
        } catch (err) {
            errors.notfound = `cannot find user by id: ${req.user.id}`;
            return res.status(404).json(errors);
        }
    }
    /*
    @route api/profiles/education/:edu_id
    @desc delete education from user profile
    @access private
    */
    async deleteEducationFromProfile(req, res) {
        const errors = {};
        try {
            const userProfile = await profile.findOne({ user: req.user.id });
            if (!userProfile) {
                errors.notfound = `user profile not found for id:${
                    req.user.id
                }`;
                return res.status(404).json(errors);
            } else {
                const deleted = deleteFromProfile(
                    userProfile.education,
                    req.params.edu_id
                );
                try {
                    await userProfile.save();
                    return res.status(200).json(userProfile);
                } catch (err) {
                    return res.status(400).json(err);
                }
            }
        } catch (err) {
            errors.notfound = `cannot find user by id: ${req.user.id}`;
            return res.status(404).json(errors);
        }
    }
}

export default ProfileController;
