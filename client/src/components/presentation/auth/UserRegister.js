import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../../common/TextFieldGroup';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmedPassword: this.state.confirmedPassword
        };
        // withRouter() wraps the component will come with this.props.history object
        this.props.performRegister(newUser, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    // when receive new props from redux, this will get called
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const errors = this.props.errors ? this.props.errors : {};
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.onChange}
                                    errors={errors}
                                />
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
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmedPassword"
                                    onChange={this.onChange}
                                    errors={errors}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserRegister.propTypes = {
    performRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


// just use connect to link any component that need data feeds from redux
//export default connect(mapStateToProps, { registerUser })(withRouter(Register));
export default withRouter(UserRegister);
