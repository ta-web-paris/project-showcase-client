import React from 'react';

const Select = ({label, name, onChange, value, optionsArray }) => {
  return ( 
     <label htmlFor={name}>{label}:
        <select name={name} onChange={onChange} value={value}>
          {optionsArray.map((oneItem, idx)=> <option key={idx} value={oneItem}>{oneItem}</option> )}
        </select>
     </label>
   );
}
 
export default Select;