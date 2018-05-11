import express from "express";

const postsRouter = express.Router();

postsRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello postsRouter" });
});

export default postsRouter;
