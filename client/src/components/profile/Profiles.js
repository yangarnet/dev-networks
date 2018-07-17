import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../common/Spinner";
import { fetchAllUsersProfile } from "../../action/profileAction";
import ProfileItems from "./ProfileItems";

class Profiles extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProfiles();
    }

    render() {
        const { profiles, loading } = this.props;
        let profileItems = null;
        if (profiles === null || profiles === undefined || loading) {
            profileItems = <Spinner />;
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(((profile, index) => (<ProfileItems key={index} profile={profile}/>)));
            } else {
                profileItems = <h4>No profiles found ....</h4>;
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { profile } = state;
    if (profile) {
        return {
            loading: profile.loading,
            profiles: profile.profileList
        };
    }
    return {};
};

const mapDistpatchToProps = (dispatch, ownProps) => ({
    fetchProfiles: () => dispatch(fetchAllUsersProfile())
});

Profiles.propTypes = {
    profiles: PropTypes.array,
    loading: PropTypes.bool
};

Profiles.defaultProps = {
    profiles: [],
    loading: true
};

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(Profiles);
