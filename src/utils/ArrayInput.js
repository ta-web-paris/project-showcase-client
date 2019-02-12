import React from 'react';

const ArrayInput = (props) => {
  const {label, fieldArray, type="text", name, onChange, onClick} = props
  return ( 
    <React.Fragment>
      <label> {label}: 
          {fieldArray.map((oneItem, idx) => (
            <input
              key={idx}
              type={type}
              name={name}
              placeholder={`${name.slice(0,name.length-1)} #${idx+1}`}
              value={oneItem}
              onChange={onChange(idx)}
            />
          ))}
      </label>

      <button type="button" onClick={onClick}>
       Add More {label}
      </button>
    </React.Fragment>
   );
}
 
export default ArrayInput;