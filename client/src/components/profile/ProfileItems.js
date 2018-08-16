import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/helper";

const getDeveloperTop4Skills = skills => {
    const top4Skills = ['javascript', 'reactjs', 'redux', 'nodejs'];
    let top4 = skills.reduce( (accumulator, currentValue) => {
        if (top4Skills.indexOf(currentValue.trim().toLowerCase()) !== -1) {
            return accumulator.concat(currentValue);
        }
        return accumulator;
    }, []).sort();
    skills.forEach(currentValue => {
        if (top4.length < 4 && top4.indexOf(currentValue) === -1) {
            top4.push(currentValue);
        }
    });

    return top4;
};

const ProfileItems = props => {
    const { profile, location } = props;
    const top4 = getDeveloperTop4Skills(profile.skills);

    return isEmpty(profile) ? null : (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img
                        src={profile.user.avatar}
                        className="rounded-circle"
                        alt=""
                    />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{profile.user.name}</h3>
                    <p>
                        {profile.status}{" "}
                        {isEmpty(profile.company) ? null : (
                            <span>at {profile.company}</span>
                        )}
                    </p>
                    <p>
                        {isEmpty(location) ? null : (
                            <span>{profile.location}</span>
                        )}
                    </p>
                    <Link
                        to={`/profile/${profile.handle}`}
                        className="btn btn-info"
                    >
                        view profile details
                    </Link>
                </div>
                <div className="col-md-4 none d-md-block">
                    <h4>Highlight Skill set</h4>
                    <ul className="list-group">
                        {top4.length > 0 && top4.map((skill, index) => {
                            return (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

ProfileItems.propTypes = {
    profiles: PropTypes.object
};

ProfileItems.defaultProps = {
    profiles: {}
};

export default ProfileItems;
