import express from "express";

const profilesRouter = express.Router();

profilesRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello profilesRouter" });
});

export default profilesRouter;
