import React from "react";
import { isEmpty } from "../../../utils/helper";

const ProfileSocial = ({ youtube, twitter, facebook, linkedIn, instagram }) => (
    <p>
        {isEmpty(youtube) ? null : (
            <a className="text-white p-2" href={youtube} target="_blank">
                <i className="fas fa-youtube fa-2x" />
            </a>
        )}
        {isEmpty(twitter) ? null : (
            <a className="text-white p-2" href={twitter} target="_blank">
                <i className="fab fa-twitter fa-2x" />
            </a>
        )}
        {isEmpty(facebook) ? null : (
            <a className="text-white p-2" href={facebook} target="_blank">
                <i className="fab fa-facebook fa-2x" />
            </a>
        )}
        {isEmpty(linkedIn) ? null : (
            <a className="text-white p-2" href={linkedIn} target="_blank">
                <i className="fab fa-linkedin fa-2x" />
            </a>
        )}
        {isEmpty(instagram) ? null : (
            <a className="text-white p-2" href={instagram} target="_blank">
                <i className="fab fa-instagram fa-2x" />
            </a>
        )}
    </p>
);

export default ProfileSocial;
