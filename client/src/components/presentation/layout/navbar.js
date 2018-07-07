import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogout } from '../../../action/authAction';
import { clearCurrentUserProfile } from '../../../action/profileAction';

class NavBar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearProfile();
        this.props.userLogout();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title='need your gravtar image'
                        />
                    </a>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevConnector</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">{' '} Developers</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLogout: () => { dispatch(userLogout()) },
        clearProfile: () => { dispatch(clearCurrentUserProfile()) }
    };
};

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    userLogout: PropTypes.func.isRequired
};

// connect the redux store to user component.
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
