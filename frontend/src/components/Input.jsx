import React from "react";

export const Input = ({icon, type, id, name, placeholder, value, onInputChange}) => {
  return (
    <>
      <span className="input-group-text">
        <i className={icon}></i>{" "}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};
