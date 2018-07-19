import React from "react";
import PropTypes from "prop-types";
import ProfileSocial from "./ProfileSocial";

const ProfileHeader = ({
    userName,
    userImg,
    companyName,
    location,
    social
}) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                    <div className="col-4 col-md-3 m-auto">
                        <img
                            className="rounded-circle"
                            src={userImg}
                            alt={userName}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="display-4 text-center">{userName}</h1>
                    <p className="lead text-center">{companyName}</p>
                    <p>{location}</p>
                    <ProfileSocial {...social} />
                </div>
            </div>
        </div>
    </div>
);

ProfileHeader.propTypes = {
    userName: PropTypes.string,
    userImg: PropTypes.string,
    companyName: PropTypes.string,
    location: PropTypes.string,
    social: PropTypes.object
};

ProfileHeader.defaultProps = {
    userName: "",
    userImg: "",
    companyName: "",
    location: "",
    social: {}
};

export default ProfileHeader;
