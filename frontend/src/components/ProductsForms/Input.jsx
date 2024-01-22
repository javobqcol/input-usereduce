import React from "react";

export const Input = ({icon, type, id, refer, name, placeholder, value, onInputChange}) => {
  return (
    <>
      <input
        id={id}
        ref={refer}
        type={type}
        name={name}
        className="form-control"
        placeholder=" "
        value={value}
        onChange={onInputChange}
      />
      <label htmlFor={name} className="form__label">{placeholder}</label>
      <i className={icon}></i>{" "}
    </>
  );
};
