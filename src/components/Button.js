import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, type, icon, label, onClick }) => {
  className = className ? `btn ${className}` : 'btn';
  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
      <i className="material-icons right">{icon}</i>
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;

