import React from "react";

const FormInputText = ({ errorMessage, className, ...props }) => {
  return (
    <>
      <input
        {...props}
        className={`input ${errorMessage ? "is-danger" : ""} ${className}`}
      />
      {errorMessage && (
        <span className="is-size-7 has-text-danger">{errorMessage}</span>
      )}
    </>
  );
};

export default FormInputText;
