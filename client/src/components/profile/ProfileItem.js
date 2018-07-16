import React from "react";

const ProfileItem = props => {
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img
                        src={props.profile.user.avatar}
                        className="rounded-circle"
                        alt=""
                    />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{props.profile.user.name}</h3>
                    <p>
                        {props.profile.status}{" "}
                        {isEmpty(props.profile.company) ? null : (
                            <span>at {props.profile.company}</span>
                        )}
                    </p>
                    <p>
                        {isEmpty(props.location) ? null : (
                            <span>{props.profile.location}</span>
                        )}
                    </p>
                    <Link
                        to={`/profile/${props.profile.handle}`}
                        className="btn btn-info"
                    >
                        view profile details
                    </Link>
                </div>
                <div className="col-md-4 none d-md-block">
                    <h4>Skill set</h4>
                    <ul className="list-group">
                        {props.profile.skills
                            .slice(0, 4)
                            .map((skill, index) => {
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </li>;
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileItem;
