import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../presentation/auth/Login";
import { userLogin } from "../../action/authAction";
import { CLEAR_ERRORS } from "../../action/types";

const UserLogin = props => {
    return (
        <Login
            auth={props.auth}
            errors={props.errors}
            userLogin={props.userLogin}
            clearError={props.clearError}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLogin: userData => {
            dispatch(userLogin(userData));
        },
        clearError: () => dispatch({ type: CLEAR_ERRORS })
    };
};

UserLogin.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    userLogin: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin);
