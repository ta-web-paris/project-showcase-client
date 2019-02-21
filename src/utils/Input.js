import React from 'react';

const Input = (props) => {
  const {label, type = "text", name, onChange, value} = props;
  return (
      <label>{label}:
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value} className="form-control"
        />
      </label>
   )
}
 
export default Input;