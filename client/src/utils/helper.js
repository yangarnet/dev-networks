import axios from "axios";

export const setAuthToken = token => {
    if (token) {
        // apply to subsequent req, so sys knows who is logged in and can get
        // user profile properly(not get wrong profile)
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const isEmpty = obj => {
    return (
        obj === undefined ||
        obj === null ||
        (typeof obj === "object" && Object.keys(obj).length === 0) ||
        (typeof obj === "string" && obj.trim().length === 0) ||
        (Array.isArray(obj) && obj.length === 0)
    );
};

export const getProfileByHandle = (profileList, handle) => {
    if (Array.isArray(profileList)) {
        const result = profileList.find(profile => profile.handle === handle);
        if (result === undefined) {
            return {};
        }
        return result;
    }
    return {};
};

export const getDeveloperTop4Skills = skills => {
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
