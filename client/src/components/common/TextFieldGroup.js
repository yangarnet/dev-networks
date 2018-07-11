import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = props => {
    return (
        <div className="form-group">
            <input
                type={props.type}
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

TextFieldGroup.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup;
