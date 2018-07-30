import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addUserExperience } from "../../action/profileAction";
import { isEmpty } from "../../utils/helper";
class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            title: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: "",
            errors: {},
            disabled: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const payload = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };
        this.props.addExp(payload, this.props.history);
    }

    // as componentWillReceiveProps() will be depcated
    // to-do: UNSAFE_componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.errors)) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        e.preventDefault();
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Add Experience
                            </h1>
                            <p className="lead text-center">
                                Add any job or position that you have had in the
                                past or current
                            </p>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    disabled={
                                        this.state.disabled ? "disabled" : ""
                                    }
                                    errors={errors}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label
                                        htmlFor="current"
                                        className="form-check-label"
                                    >
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    info="Tell us about this position"
                                    errors={errors}
                                />
                                <input
                                    type="submit"
                                    value="Submit"
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
    const { profile } = state.profile;
    if (profile && profile.experiences) {
        return {
            userExperice: profile.experiences,
            errors: state.errors
        };
    } else {
        return {};
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addExp: (experience, history) =>
            dispatch(addUserExperience(experience, history))
    };
};

AddExperience.propTypes = {
    addExp: PropTypes.func.isRequired,
    userExperice: PropTypes.array,
    errors: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddExperience));
