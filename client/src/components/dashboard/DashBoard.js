import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profileAction";
import { Spinner } from "../common/Spinner";
import Profile from "./Profile";

class DashBoard extends Component {
    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.props.getCUrrentUserProfile();
    }

    onDelete() {}

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashBoard;
        if (!profile || loading) {
            dashBoard = <Spinner />;
        } else {
            if (Object.keys(profile).length > 0) {
                dashBoard = (
                    <div>
                        <p>
                            Welcome{"  "}
                            <Link to={`/profile/${profile.handle}`}>
                                {user.name}
                            </Link>
                        </p>
                        <Profile />
                        <div style={{ marginButtono: "60px" }} />
                        <button
                            className="btn btn-danger"
                            onClick={this.onDelete}
                        >
                            Delete My Account
                        </button>
                    </div>
                );
            } else {
                // logged in user need to create new user prifle
                dashBoard = (
                    <div>
                        <p className="lead text-muted">Welcome, {user.name}</p>
                        <p>
                            {" "}
                            You have not yet setup a profile, please add some
                            information.
                        </p>
                        <Link
                            to="/create-profile"
                            className="btn btn-lg btn-info"
                        >
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">DashBoard</h1>
                            {dashBoard}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth,
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCUrrentUserProfile: () => {
            return dispatch(getCurrentProfile());
        }
    };
};

DashBoard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCUrrentUserProfile: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
