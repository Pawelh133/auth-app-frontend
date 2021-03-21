import React from 'react';
import PropTypes from 'prop-types';
import { Input as AntInput } from 'antd';

const Input = ({ label, onChange, value, className, type }) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <AntInput
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  onBlur: () => { },
  className: 'regular-input',
};

export default Input;
