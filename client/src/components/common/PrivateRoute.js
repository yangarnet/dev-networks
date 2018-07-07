import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// HOC for private route
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth
    };
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(PrivateRoute);
