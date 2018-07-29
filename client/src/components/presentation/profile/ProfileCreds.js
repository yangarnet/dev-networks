import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileCreds = ({ experiences, education }) => (
    <div className="row">
        <div className="col-md-6">
            <h3 className="text-center text-info">Experience</h3>
            <ul className="list-group">
                {experiences.map(exp => (
                    <li className="list-group-item" key={exp.id}>
                        <h4>{exp.company}</h4>
                        <p>
                            <Moment format="MM/YYYY">{exp.from}</Moment>
                            {"  ~  "}
                            {exp.to === null ? (
                                "Now"
                            ) : (
                                <Moment format="MM/YYYY">{exp.to}</Moment>
                            )}
                        </p>
                        <p>
                            <strong>Position:</strong>
                            {exp.title}
                        </p>
                        <div>
                            <p>
                                <strong>Location: </strong>
                                {exp.location}
                            </p>
                            <strong>Description:</strong>
                            {exp.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="col-md-6">
            <h3 className="text-center text-info">Education</h3>
            <ul className="list-group">
                {education.map(edu => (
                    <li className="list-group-item">
                        <h4>{edu.school}</h4>
                        <p>
                            <Moment format="MM/YYYY">{edu.from}</Moment>
                            {"  ~  "}
                            {edu.to === null ? (
                                "Now"
                            ) : (
                                <Moment format="MM/YYYY">{edu.to}</Moment>
                            )}
                        </p>
                        <p>
                            <strong>Degree: </strong>
                            {edu.degree}
                        </p>
                        <p>
                            <strong>Field Of Study: </strong>
                            {edu.fieldOfStudy}
                        </p>
                        <p>
                            <strong>Description:</strong> {edu.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

ProfileCreds.propTypes = {
    experiences: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired
};

ProfileCreds.defaultProps = {
    experiences: [],
    education: []
};

export default ProfileCreds;
