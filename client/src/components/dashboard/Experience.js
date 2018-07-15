import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteUserExperience } from '../../action/profileAction';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(expId) {
        this.props.deleteExperience(expId);
    }

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
                    <button className="btn btn-danger" onClick={() => this.onDelete(exp._id)}>Delete Experience</button>
                </td>
            </tr>
        ));
        return (
            <div className="mb-4">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>company</th>
                            <th>title</th>
                            <th>years</th>
                            <th></th>
                        </tr>
                        {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteExperience: (expId) => dispatch(deleteUserExperience(expId))
    };
};
export default connect(null, mapDispatchToProps)(Experience);
