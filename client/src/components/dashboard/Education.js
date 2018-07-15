import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteUserEducation } from '../../action/profileAction';

class Education extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(eduId) {
        this.props.deleteEducation(eduId);
    }

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
                    <button className="btn btn-danger" onClick={() => this.onDelete(edu._id)}>Delete Education</button>
                </td>
            </tr>
        ));
        return (
            <div className="mb-4">
                <table className="table">
                    <tbody>
                        {this.props.education.length > 0 ? (<tr>
                            <th>school</th>
                            <th>degree</th>
                            <th>years</th>
                            <th></th>
                        </tr>) : null}
                        {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteEducation: (eduId) => dispatch(deleteUserEducation(eduId))
    };
};
export default connect(null, mapDispatchToProps)(Education);
