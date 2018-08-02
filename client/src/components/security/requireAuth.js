import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// the require Auth HOC
const requireAuth = WrappedComponent => {
    class ComponsedComponent extends Component {
        componentDidMount() {}
        render() {
            const { auth } = this.props;
            return auth.isAuthenticated ? (
                <WrappedComponent {...this.props} />
            ) : (
                <Redirect to="/login" />
            );
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.myAuth
        };
    };

    ComponsedComponent.propTypes = {
        auth: PropTypes.object.isRequired
    };

    return connect(mapStateToProps)(ComponsedComponent);
};

export default requireAuth;
