import userRouter from "../../routes/api/users";
import profilesRouter from "../../routes/api/profiles";
import postRouter from "../../routes/api/posts";

// root route config begins here
const routeConfig = app => {
  app.use("/api/user", userRouter);
  app.use("/api/profile", profilesRouter);
  app.use("/api/post", postRouter);
};

export default routeConfig;
