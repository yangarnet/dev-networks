import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ userName, bioInfo, skills }) => (
    <div className="row">
        <div className="col-md-12">
            <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{userName}'s Bio</h3>
                <p className="lead">{bioInfo}</p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {skills.map(skill => (
                            <div className="p-3">
                                <i className="fa fa-check" /> {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ProfileAbout.propTypes = {
    userName: PropTypes.string,
    bioInfo: PropTypes.string,
    skills: PropTypes.array
};

ProfileAbout.defaultProps = {
    userName: "",
    bioInfo: "",
    skills: []
};

export default ProfileAbout;
