import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';


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

        this.props.performRegister(newUser, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // when receive new props from redux, this will get called
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        console.log('presentaion props', this.props);
        const errors = this.props.errors ? this.props.errors : {};
        console.log('errossss', errors);
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.confirmedPassword
                                        })}
                                        placeholder="Confirm Password"
                                        name="confirmedPassword"
                                        onChange={this.onChange}
                                    />
                                    {errors.confirmedPassword && (<div className='invalid-feedback'>{errors.confirmedPassword}</div>)}
                                </div>
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
