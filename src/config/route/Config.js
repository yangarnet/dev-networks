import userRouter from "../../routes/api/users";
import profilesRouter from "../../routes/api/profiles";
import postsRouter from "../../routes/api/posts";

// root route config begins here
const routeConfig = app => {
  app.use("/api/user", userRouter);
  app.use("/api/profile", profilesRouter);
  app.use("/api/post", postsRouter);
};

export default routeConfig;
