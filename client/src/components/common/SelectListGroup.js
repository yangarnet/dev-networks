import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = props => {
    const selectOptions = props.options.map(opt => (
        <option key={opt.label} value={opt.value}>
            {opt.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select
                className={classnames("form-control form-control-lg", {
                    "is-invalid": props.errors[props.name]
                })}
                name={props.name}
                onChange={props.onChange}
            >
                {selectOptions}
            </select>
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

SelectListGroup.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default SelectListGroup;
