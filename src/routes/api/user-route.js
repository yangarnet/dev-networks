import express from "express";
import passport from "passport";
import UserController from "../../controllers/user";

const userRoute = () => {
    const userRouter = express.Router();
    const userCtrl = new UserController();

    userRouter.post("/register", userCtrl.register);
    userRouter.post("/login", userCtrl.login);
    // store the logged in user in request, NOT in session, by { session: false }
    // client will store the token and sends it back each subsequent request
    userRouter.get(
        "/current-user",
        passport.authenticate(process.env.AUTH_TYPE, { session: false }),
        userCtrl.getCurrentUser
    );

    return userRouter;
};

export default userRoute;
