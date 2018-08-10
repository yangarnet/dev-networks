import React from "react";
import { mount } from "enzyme";
import { Link} from 'react-router-dom';
import sinon from "sinon";
import { MemoryRouter as Router } from "react-router-dom";
import ReduxRoot from "../../../ReduxRoot";
import Profiles from "../Profiles";
import ProfileItems from "../ProfileItems";

describe("Test Redux Connected Component", () => {

    it("should render nothing when user profile list is empty", ()=>{
        const initialState = {
            myAuth: {
                isAuthenticated: true,
                user: {
                    id: "5b5ff3526c8f840054e6293a",
                    name: "Garnet Yang",
                    avatar:
                        "//www.gravatar.com/avatar/70f641ccefc65afc2b820ba36b7a1815?s=200&r=pg&d=mm",
                    iat: 1533691046,
                    exp: 1533694646
                }
            },
            errors: {},
            profile: {
                profile: {

                },
                profileList: [

                ],
                loading: false
            },
            post: {
                posts: [],
                post: {},
                loading: false
            }
        };

        let wrapped = mount(
            <ReduxRoot initialState={initialState}>
                <Router>
                    <Profiles />
                </Router>
            </ReduxRoot>
        );

        expect(wrapped.find(ProfileItems)).to.have.length(0);
        expect(wrapped.find("div.container")).to.have.lengthOf(1);
        expect(wrapped.find('h4').text()).to.be.equal('No profiles found ....');
    });

    it("should load redux connected component properly", () => {

        const initialState = {
            myAuth: {
                isAuthenticated: true,
                user: {
                    id: "5b5ff3526c8f840054e6293a",
                    name: "Garnet Yang",
                    avatar:
                        "//www.gravatar.com/avatar/70f641ccefc65afc2b820ba36b7a1815?s=200&r=pg&d=mm",
                    iat: 1533691046,
                    exp: 1533694646
                }
            },
            errors: {},
            profile: {
                profile: {
                    social: {
                        facebook: "http://www.facebook.com.au",
                        twitter: "http://www.twitter.com.au",
                        youtube: "http://www.youtube.com.au",
                        instagram: "http://www.instagram.com.au",
                        linkedIn: "www.linkedin.com"
                    },
                    skills: [
                        "javascrip",
                        "html",
                        "nodejs",
                        "redux",
                        "mongodb",
                        "css",
                        "aws"
                    ],
                    _id: "5b5ff3976c8f840054e6293b",
                    handle: "test",
                    company: "test pty",
                    location: "Sydney",
                    status: "Snr Developer",
                    bio: "have been working as full stack developer test pty",
                    githubusername: "testgithub",
                    user: {
                        _id: "5b5ff3526c8f840054e6293a",
                        name: "test firstname",
                        avatar:
                            "//www.gravatar.com/avatar/70f641ccefc65afc2b820ba36b7a1815?s=200&r=pg&d=mm"
                    },
                    dateAdded: "2018-07-31T05:28:55.412Z",
                    experiences: [
                        {
                            current: false,
                            _id: "5b5ff4036c8f840054e6293c",
                            title: "software developer",
                            company: "test pty",
                            location: "Sydney",
                            from: "2007-03-01T00:00:00.000Z",
                            to: "2010-03-05T00:00:00.000Z",
                            description: "working there since 2007 until 2010"
                        }
                    ],
                    education: [
                        {
                            current: false,
                            _id: "5b5ff43f6c8f840054e6293e",
                            school: "MIT",
                            degree: "bachelor",
                            fieldOfStudy: "computer sicence",
                            from: "2008-03-08T00:00:00.000Z",
                            to: "2012-04-14T00:00:00.000Z",
                            description:
                                "learning computer science and technology in mit"
                        }
                    ],
                    lastUpdated: "2018-08-07T03:36:48.230Z",
                    __v: 1,
                    webSite: null
                },
                profileList: [
                    {
                        social: {
                            facebook: "http://www.facebook.com.au",
                            twitter: "http://www.twitter.com.au",
                            youtube: "http://www.youtube.com.au",
                            instagram: "http://www.instagram.com.au",
                            linkedIn: "www.linkedin.com"
                        },
                        skills: [
                            "javascrip",
                            "html",
                            "nodejs",
                            "redux",
                            "mongodb",
                            "css",
                            "aws"
                        ],
                        _id: "5b5ff3976c8f840054e6293b",
                        handle: "test",
                        company: "test pty Australia",
                        location: "Sydney",
                        status: "Snr Developer",
                        bio: "have been working as full stack developer",
                        githubusername: "test",
                        user: {
                            _id: "5b5ff3526c8f840054e6293a",
                            name: "test",
                            avatar:
                                "//www.gravatar.com/avatar/70f641ccefc65afc2b820ba36b7a1815?s=200&r=pg&d=mm"
                        },
                        dateAdded: "2018-07-31T05:28:55.412Z",
                        experiences: [
                            {
                                current: false,
                                _id: "5b5ff4036c8f840054e6293c",
                                title: "software developer",
                                company: "test pty",
                                location: "Sydney",
                                from: "2007-03-01T00:00:00.000Z",
                                to: "2010-03-05T00:00:00.000Z",
                                description:
                                    "working there since 2007 until 2010"
                            }
                        ],
                        education: [
                            {
                                current: false,
                                _id: "5b5ff43f6c8f840054e6293e",
                                school: "MIT",
                                degree: "bachelor",
                                fieldOfStudy: "computer sicence",
                                from: "2008-03-08T00:00:00.000Z",
                                to: "2012-04-14T00:00:00.000Z",
                                description:
                                    "learning computer science and technology in mit"
                            }
                        ],
                        lastUpdated: "2018-08-07T03:36:48.230Z",
                        __v: 1,
                        webSite: null
                    },
                    {
                        social: {
                            facebook: null,
                            twitter: null,
                            youtube: null,
                            instagram: null,
                            linkedIn: null
                        },
                        skills: ["javascrip", "html", "nodejs", "redux"],
                        _id: "5b5ff4e76c8f840054e62945",
                        handle: "john-doe",
                        company: "test",
                        location: "sydney",
                        status: "Manager",
                        bio: "a developer from test pty",
                        githubusername: "testjohndoe",
                        user: {
                            _id: "5b5ff49d6c8f840054e62943",
                            name: "john doe",
                            avatar:
                                "//www.gravatar.com/avatar/e13743a7f1db7f4246badd6fd6ff54ff?s=200&r=pg&d=mm"
                        },
                        dateAdded: "2018-07-31T05:34:31.965Z",
                        experiences: [
                            {
                                current: false,
                                _id: "5b5ff51e6c8f840054e62946",
                                title: "snr deve",
                                company: "test pty",
                                location: "Sydney",
                                from: "2012-03-01T00:00:00.000Z",
                                to: "2016-01-05T00:00:00.000Z",
                                description:
                                    "working in the company since , very happy with it"
                            }
                        ],
                        education: [
                            {
                                current: true,
                                _id: "5b5ff54e6c8f840054e62948",
                                school: "UCLA",
                                degree: "bachelor",
                                fieldOfStudy: "computer sicence",
                                from: "2013-03-08T00:00:00.000Z",
                                to: null,
                                description: "working and learning career"
                            }
                        ],
                        lastUpdated: "2018-07-31T05:46:30.279Z",
                        __v: 1,
                        webSite: null
                    }
                ],
                loading: false
            },
            post: {
                posts: [],
                post: {},
                loading: false
            }
        };

        let wrapped = mount(
            <ReduxRoot initialState={initialState}>
                <Router>
                    <Profiles />
                </Router>
            </ReduxRoot>
        );
        expect(wrapped.find("div.container")).to.have.lengthOf(1);
        expect(wrapped.find(ProfileItems)).to.have.length(2);

        expect(wrapped.find('div.col-lg-6.col-md-4.col-8')
                             .at(0).contains(
                                <Link
                                to={`/profile/test`}
                                className="btn btn-info"
                                >view profile details</Link>)).to.be.true;

        expect(wrapped.find('div.col-lg-6.col-md-4.col-8')
                                .at(1).contains(
                                   <Link
                                   to={`/profile/john-doe`}
                                   className="btn btn-info"
                                   >view profile details</Link>)).to.be.true;

    });
});
