import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from '../presentation/auth/register';
import { registerUser } from '../../action/authAction';

class UserRegisterContainer extends Component {

    render() {
        console.log('container props', this.props);
        return (
            <Register
                performRegister={this.props.performRegister}
                auth={this.props.auth}
                errors={this.props.errors}
            />
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    auth: state.myAuth,
    errors: state.regErrors.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        performRegister: (userData, history) => {
            dispatch(registerUser(userData, history));
        }
    };
};

UserRegisterContainer.propTypes = {
    performRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterContainer);
