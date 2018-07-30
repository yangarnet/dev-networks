import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addNewComment } from "../../../action/postAction";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            text: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newComment = {
            text: this.state.text
        };

        this.props.addComment(this.props.postId, newComment);
        this.setState({ name: "", text: "" });
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Leave your comment...
                    </div>

                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <small className="d-block pb-3">
                                * required fields
                            </small>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="*post content"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    errors={this.state.errors}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Add Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.myAuth,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addComment: (postId, comment) =>
            dispatch(addNewComment(postId, comment))
    };
};

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CommentForm));
