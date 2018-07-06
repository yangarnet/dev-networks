import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profileAction';


class DashBoard  extends Component {

    componentDidMount() {
        this.props.getCUrrentUserProfile();
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>DashBoard</h2>
            </div>
        );
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.profile
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCUrrentUserProfile: () => {
            return dispatch(getCurrentProfile());
        }
    }
};

DashBoard.propTypes = {
    getCUrrentUserProfile: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
