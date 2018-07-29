import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../../common/Spinner";
import { getProfileByHandle, isEmpty } from "../../../utils/helper";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import { getUserProfileByHandle } from "../../../action/profileAction";

const prepareHeaderData = raw => ({
    userName: !isEmpty(raw) && !isEmpty(raw.user) ? raw.user.name : "",
    userImg: !isEmpty(raw) && !isEmpty(raw.user) ? raw.user.avatar : "",
    companyName: !isEmpty(raw) ? raw.company : "",
    location: !isEmpty(raw) ? raw.location : "",
    social: !isEmpty(raw) ? raw.social : {}
});

const prepareAboutData = raw => ({
    userName: !isEmpty(raw) && !isEmpty(raw.user) ? raw.user.name : "",
    bioInfo: !isEmpty(raw) ? raw.bio : "",
    skills: !isEmpty(raw) ? raw.skills : []
});

const prepareCreds = raw => ({
    experiences: !isEmpty(raw) ? raw.experiences : [],
    education: !isEmpty(raw) ? raw.education : []
});

// the component
class Profile extends Component {
    componentDidMount() {
        if (isEmpty(this.props.profileList)) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {
        const handle = this.props.match.params.handle;
        const { loading } = this.props;
        const profile = getProfileByHandle(this.props.profileList, handle);
        let profileContent;
        if (loading) {
            profileContent = <Spinner />;
        } else {
            const profileHeaderData = prepareHeaderData(profile);
            const profileAboutData = prepareAboutData(profile);
            const profileCredsData = prepareCreds(profile);

            profileContent = isEmpty(profile) ? null : (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link
                                to="/profiles"
                                className="btn btn-light mb-3 float-left"
                            >
                                Back to Profiles
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader {...profileHeaderData} />
                    <ProfileAbout {...profileAboutData} />
                    <ProfileCreds {...profileCredsData} />
                    {isEmpty(profile) &&
                    isEmpty(profile.githubusername) ? null : (
                        <ProfileGithub userName={profile.githubusername} />
                    )}
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { profile } = state;
    return {
        profileList: profile.profileList,
        loading: profile.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfileByHandle: handle => dispatch(getUserProfileByHandle(handle))
    };
};

Profile.propTypes = {
    profileList: PropTypes.array,
    loading: PropTypes.bool,
    getProfileByHandle: PropTypes.func.isRequired
};

Profile.defaultProps = {
    profileList: [],
    loading: true
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
