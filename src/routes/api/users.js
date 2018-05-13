import express from "express";
import UserModel from "../../models/UserModel";
import _ from "lodash";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const payload = _.pick(req.body, ["name", "email", "password"]);
  const avatar = gravatar.url(payload.email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  try {
    const user = await UserModel.findOne({ email: payload.email });
    if (user) {
      throw new Error(`Error: email ${user.email} already registered`);
    } else {
      const newUser = new UserModel({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        avatar
      });
      try {
        // password hashing takes place in UserSchema.pre("save", next)
        const result = await newUser.save();
        res.status(200).json({
          user: {
            name: result.name,
            email: result.email
          }
        });
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  } catch (exception) {
    res.status(400).json({
      name: exception.name,
      msg: exception.message
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const payload = _.pick(req.body, ["name", "email", "password"]);
  try {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      throw new Error(`User not found`);
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (isMatch) {
      const tokenPayload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      };
      // now sign the token after success login
      const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: 3600
      });
      if (token) {
        res.status(200).json({ success: true, token: `Bearer ${token}` });
      } else {
        throw new Error("Error in signing the token");
      }
    } else {
      throw new Error("Password incorrect");
    }
  } catch (err) {
    res.status(404).json({ errMsg: err.message });
  }
});

export default userRouter;
