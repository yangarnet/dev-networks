import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../presentation/auth/Login';
import { userLogin } from '../../action/authAction';

const UserLogin = (props) => {
    return (<Login auth={props.auth} errors={props.errors} userLogin={props.userLogin} />)
};


const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLogin: (userData) => { dispatch(userLogin(userData)) }
    };
};


UserLogin.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    userLogin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
