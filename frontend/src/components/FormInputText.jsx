import React from "react";

const FormInputText = ({ inputProps, labelText, isInvalid, errorMessage }) => {
  return (
    <div className="field">
      <label className={`label ${isInvalid && "has-text-danger"}`}>
        {labelText}
      </label>
      <div className="control">
        <input
          {...inputProps}
          className={`input ${isInvalid && "is-danger"}`}
        />
        {errorMessage && (
          <span className="is-size-7 has-text-danger">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default FormInputText;
