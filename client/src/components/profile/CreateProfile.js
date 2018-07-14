import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createUserProfile } from "../../action/profileAction";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickSocialInputs = this.onClickSocialInputs.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        // passing the history here for later redirection.
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        // set the target value by name.
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickSocialInputs() {
        this.setState(preState => ({
            displaySocialInputs: !preState.displaySocialInputs
        }));
    }

    render() {
        const { displaySocialInputs } = this.state;
        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        onChange={this.onChange}
                        errors={this.props.errors}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        onChange={this.onChange}
                        errors={this.props.errors}
                    />
                    <InputGroup
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        onChange={this.onChange}
                        errors={this.props.errors}
                    />
                    <InputGroup
                        placeholder="YouTube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        onChange={this.onChange}
                        errors={this.props.errors}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        onChange={this.onChange}
                        errors={this.props.errors}
                    />
                </div>
            );
        }
        const options = [
            { label: "* Select Professional Status", value: 0 },
            { label: "Developer", value: "Developer" },
            { label: "Jnr Developer", value: "Jnr Developer" },
            { label: "Snr Developer", value: "Snr Developer" },
            { label: "Manager", value: "Manager" },
            { label: "Snr Manager", value: "Snr Manager" },
            { label: "Intern", value: "Intern" },
            { label: "General Manager", value: "General Manager" },
            { label: "Other", value: "Other" }
        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-centre">
                                Let's get some information to make your profile
                                stand out
                            </p>
                            <small className="d-block pb-3">
                                * =required field
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="A unique handle for your profile"
                                />
                                <SelectListGroup
                                    placeholder=" Status"
                                    name="status"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="Tell us where you are at in the your career"
                                    options={options}
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="could be your own company or one your work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="URL, could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="location"
                                    name="location"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="city or city&state"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="please input comma separated values (e.g. HTML,JavaScript,Nodejs)"
                                />
                                <TextFieldGroup
                                    placeholder="Github username"
                                    name="githubusername"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="If you want your latest repos, and a github link, include your uername"
                                />
                                <TextAreaFieldGroup
                                    placeholder="short bio"
                                    name="bio"
                                    onChange={this.onChange}
                                    errors={this.props.errors}
                                    info="Tell us a littel bit about yourself"
                                />
                                <div className="mb-3">
                                    <button
                                        className="btn btn-light"
                                        onClick={this.onClickSocialInputs}
                                    >
                                        Add Social Networks Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.profile,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProfile: (profileData, history) =>
            dispatch(createUserProfile(profileData, history))
    };
};

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object,
    createProfile: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CreateProfile));
