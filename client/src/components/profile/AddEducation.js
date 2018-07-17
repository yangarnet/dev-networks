import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addUserEducation } from "../../action/profileAction";
import { isEmpty } from "../../utils/helper";

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: "",
            degree: "",
            degree: "",
            from: "",
            to: "",
            current: false,
            description: "",
            errors: {},
            disabled: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);

    }

    // this componentWillReceiveProps() will be deprecated
    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.errors)) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const payload = {
            school: this.state.school,
            degree: this.state.degree,
            fieldOfStudy: this.state.fieldOfStudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };
        this.props.addEducation(payload, this.props.history);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
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
                                Add Education
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
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Field Of Study"
                                    name="fieldOfStudy"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                    disabled={
                                        this.state.disabled ? "disabled" : ""
                                    }
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
                                        Current Education
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Education Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                    info="Tell us about your education"
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
    if (profile && profile.education) {
        return {
            userEducation: profile.education,
            errors: state.errors
        };
    } else {
        return {};
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addEducation: (education, history) => {
            dispatch(addUserEducation(education, history))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddEducation));
