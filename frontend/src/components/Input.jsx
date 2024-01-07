import React from "react";

export const Input = ({icon, type, id, refer, name, placeholder, value, onInputChange}) => {
  return (
    <>
      <span className="input-group-text">
        <i className={icon}></i>{" "}
      </span>
      <input
        id={id}
        ref={refer}
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
