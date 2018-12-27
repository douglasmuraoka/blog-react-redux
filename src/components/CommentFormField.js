import React from 'react';
import PropTypes from 'prop-types';

const CommentFormField = ({ id, name, type = 'text', label, onChange, value }) => {
  let input = type === 'textarea'
    ? <textarea id={id} className='materialize-textarea validate' name={name}
        type={type} onChange={onChange} value={value} required></textarea>
    : <input id={id} name={name} type={type} className="validate"
        onChange={onChange} value={value} required></input>;
  return (
    <div className='input-field'>
      {input}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

CommentFormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default CommentFormField;