import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = props => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", {
                    "is-invalid": props.errors[props.name]
                })}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            {props.info && (
                <small className="form-text text-muted">{props.info}</small>
            )}
            {props.errors[props.name] && (
                <div className="invalid-feedback">
                    {props.errors[props.name]}
                </div>
            )}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default TextAreaFieldGroup;
