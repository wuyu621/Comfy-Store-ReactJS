import React from "react";

const FormCheckbox = ({ label, size, defaultValue, name }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer capitalize">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="checkbox"
        className={`checkbox checkbox-primary ${size}`}
        name={name}
        defaultChecked={defaultValue}
      />
    </div>
  );
};

export default FormCheckbox;
