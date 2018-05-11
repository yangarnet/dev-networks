import express from "express";

const userRouter = express.Router();

userRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello userRouter" });
});

export default userRouter;
