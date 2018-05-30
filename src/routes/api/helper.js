import isEmpty from '../../validation/IsEmpty';

const setProfilesToUpdate = (payload, currentProfile) => {
    return {
        handle: !isEmpty(payload.handle) ? payload.handle : currentProfile.handle,
        company: !isEmpty(payload.company) ? payload.company : currentProfile.company,
        webSite: !isEmpty(payload.webSite) ? payload.webSite : currentProfile.webSite,
        location: !isEmpty(payload.location) ? payload.location : currentProfile.location,
        status: !isEmpty(payload.status) ? payload.status : currentProfile.status,
        skills: !isEmpty(payload.status) ? currentProfile.skills.concat(payload.skills) : currentProfile.skills,
        bio: !isEmpty(payload.bio) ? payload.bio : currentProfile.bio,
        githubusername: !isEmpty(payload.githubusername) ? payload.githubusername : currentProfile.githubusername,
        //experiences: !isEmpty(payload.experiences) ? currentProfile.experiences.concat(payload.experiences) : currentProfile.experiences,
        //education: !isEmpty(payload.education) ? currentProfile.education.concat(payload.education) : currentProfile.education,
        social: Object.assign(currentProfile.social, payload.social), // merge two objects into one
        lastUpdated: Date.now()
    }
};

export default setProfilesToUpdate;
