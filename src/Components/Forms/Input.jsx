import React from "react";
const Input = ({
  title,
  name = "",
  onChange,
  type = "text",
  register,
  disabled = false,
  defaultValue,
  value,
  boolError = false,
}) => {
  const handleKeyDown = (event) => {
    if (
      event.target.type === "number" &&
      (event.key === "e" || event.key === "E")
    ) {
      event.preventDefault();
    }
  };
  return (
    <div className="form-input">
      <label htmlFor={name}>{title}</label>
      <input
        style={{
          backgroundColor: disabled ? "#ccd2dd53" : "#fff",
          borderColor: boolError ? "#FF0505" : "#CCD2DD",
        }}
        id={name}
        defaultValue={defaultValue}
        step="any"
        value={value}
        disabled={disabled}
        {...register(name)}
        type={type}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default Input;
// 3:44
// npm i react-hook-form
// 3:45
// npm i react-select
