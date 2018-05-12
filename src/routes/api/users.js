import express from "express";
import UserModel from "../../models/UserModel";
import _ from "lodash";
import gravatar from "gravatar";

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
        res.status(200).json({ result });
      } catch (e) {
        res.status(500).send(e);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default userRouter;
