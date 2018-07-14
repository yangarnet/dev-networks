import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Experience extends Component {
    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="DD/MM/YYYY">{exp.from}</Moment>
                    {' '}~{' '}
                    {exp.to === null ? 'Now' : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
                </td>
                <td>
                    <button className="btn btn-danger">Delete Experience</button>
                </td>
            </tr>
        ));
        return (
            <div className="mb-4">
                <table className="table">
                    <tr>
                        <th>company</th>
                        <th>title</th>
                        <th>years</th>
                        <th></th>
                    </tr>
                    {experience}
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // to do
        deleteExperience: (expId) => dispatch()
    };
};
export default connect(null, mapDispatchToProps)(Experience);
