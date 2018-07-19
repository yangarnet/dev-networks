import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../../common/Spinner";
import { getProfileByHandle, isEmpty } from "../../../utils/helper";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

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
const Profile = props => {
    const handle = props.match.params.handle;
    const { loading } = props;
    const profile = getProfileByHandle(props.profileList, handle);
    let profileContent;
    if (profile === null || loading) {
        profileContent = <Spinner />;
    } else {
        const profileHeaderData = prepareHeaderData(profile);
        const profileAboutData = prepareAboutData(profile);
        const profileCredsData = prepareCreds(profile);

        profileContent = (
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
                {isEmpty(profile) && isEmpty(profile.githubusername) ? null : (
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
};

const mapStateToProps = (state, ownProps) => {
    const { profile } = state;
    return {
        profileList: profile.profileList,
        loading: profile.loading
    };
};

Profile.propTypes = {
    profileList: PropTypes.array,
    loading: PropTypes.bool
};

Profile.defaultProps = {
    profileList: [],
    loading: true
};

export default connect(mapStateToProps)(Profile);
