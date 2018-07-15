import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Education extends Component {
    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                    {' '}~{' '}
                    {edu.to === null ? 'Now' : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
                </td>
                <td>
                    <button className="btn btn-danger">Delete Education</button>
                </td>
            </tr>
        ));
        return (
            <div className="mb-4">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>school</th>
                            <th>degree</th>
                            <th>years</th>
                            <th></th>
                        </tr>
                        {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // to do
        deleteEducation: (expId) => dispatch()
    };
};
export default connect(null, mapDispatchToProps)(Education);
