import React from 'react';

const ArrayInputCreators = (props) => {
  const { label, fieldArray, type = "text", name, onChange, onClick } = props
  return (
    <React.Fragment>
      {fieldArray.map((oneItem, idx) => (
        <React.Fragment key={idx}>
          <label> Creator :
            <input
              type={type}
              name={name}
              placeholder={`${name.slice(0, name.length - 1)} #${idx + 1}`}
              value={oneItem.name}
              onChange={onChange(idx, 'name')} className="form-control"
            />
          </label>
          <label> LinkedIn :
            <input
              type={type}
              name={name}
              placeholder={`${name.slice(0, name.length - 1)} #${idx + 1}`}
              value={oneItem.linkedInUrl}
              onChange={onChange(idx, 'linkedInUrl')} className="form-control"
            />
          </label>
        </React.Fragment>
      ))}

      <button type="button" onClick={onClick} className="btn btn-primary more">
        Add More {label}
      </button>
    </React.Fragment>
  );
}

export default ArrayInputCreators;