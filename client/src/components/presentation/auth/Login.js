import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { Spinner } from "../../common/Spinner";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // static getDeriveStateFromProps(nextProps, prevState) {
    //     if(nextProps.auth.isAuthenticated) {
    //         return {
    //             path: '/dashboard'
    //         }
    //     }
    // }

    componentDidMount() {
        this.props.clearError();
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            // the this.props.history become available because withRouter() wrapper
            this.props.history.push("/dashboard");
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const logins = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.userLogin(logins);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errors = this.props.errors ? this.props.errors : {};
        const { loading } = this.props.auth;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            {loading && <Spinner />}
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <input
                                    type="submit"
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

export default withRouter(Login);
