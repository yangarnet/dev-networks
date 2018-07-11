import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = props => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={props.icon} />
                </span>
            </div>
            <input
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

InputGroup.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default InputGroup;
