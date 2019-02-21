import React from 'react';

const TextAreaInput = (props) => {
  const {label, type = "text", name, onChange, value} = props;
  return (
      <label>{label}:
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
          type={type}
          name={name}
          onChange={onChange}
          value={value}></textarea>
        
      </label>
   )
}
 
export default TextAreaInput;