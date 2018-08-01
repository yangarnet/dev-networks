import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"; // this is where the redux store
import jwt_decode from "jwt-decode";
import "./App.css";
import NavBar from "./components/presentation/layout/NavBar";
import Landing from "./components/presentation/layout/Landing";
import Footer from "./components/presentation/layout/Footer";
import UserRegisterContainer from "./components/containers/UserRegister";
import UserLogin from "./components/containers/UserLogin";
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoute from "./components/security/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import appStore from "./store/store";
import { setAuthToken } from "./utils/helper";
import { setCurrentLoggedInUser, userLogout } from "./action/authAction";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/presentation/profile/Profile";
import Posts from "./components/post/Posts";
import PostComment from "./components/post/comments/PostComment";

// the jwt was set in async action userLogin() : localStorage.setItem('jwt', token);
// check if active token exists
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
    if (localStorage.jwt) {
        // set token in the auth header
        setAuthToken(localStorage.jwt);
        // decode the token to get user info
        const decoded = jwt_decode(localStorage.jwt);
        appStore.dispatch(setCurrentLoggedInUser(decoded));

        // check for expire token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            appStore.dispatch(userLogout());
            window.location.href = "/login";
        }
    }
}

const App = () => (
    <Provider store={appStore}>
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Route exact path="" component={Landing} />
                <div className="container">
                    <Route exact path="/login" component={UserLogin} />
                    <Route
                        exact
                        path="/register"
                        component={UserRegisterContainer}
                    />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:handle" component={Profile} />

                    {/* wrap private route in the Switch*/}
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={DashBoard}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/create-profile"
                            component={CreateProfile}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/edit-profile"
                            component={EditProfile}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/add-experience"
                            component={AddExperience}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/add-education"
                            component={AddEducation}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/post-feed"
                            component={Posts}
                        />
                    </Switch>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/post/comments/:postId"
                            component={PostComment}
                        />
                    </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>
);

export default App;
