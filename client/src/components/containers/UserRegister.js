import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser, clearError } from "../../action/authAction";
import UserRegister from "../presentation/auth/UserRegister";

// this is higher order component(HOC): receives one component and return another one
const UserRegisterContainer = props => {
    return (
        <UserRegister
            performRegister={props.performRegister}
            clearError={props.clearError}
            auth={props.auth}
            errors={props.errors}
        />
    );
};
const mapStateToProps = (state, ownProps) => ({
    auth: state.myAuth,
    errors: state.errors.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        performRegister: (userData, history) => {
            dispatch(registerUser(userData, history));
        },
        clearError: () => dispatch(clearError())
    };
};

UserRegisterContainer.propTypes = {
    performRegister: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

//Higher Order Component(HOC): a function takes a component and returns a new component.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegisterContainer);
