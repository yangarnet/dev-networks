import userRouter from "../routes/api/users";
import profilesRouter from "../routes/api/profiles";
import postsRouter from "../routes/api/posts";

const routeConfig = app => {
  app.use("/api/users", userRouter);
  app.use("/api/profiles", profilesRouter);
  app.use("/api/posts", postsRouter);
};

export default routeConfig;
