import React from 'react';
import PropTypes from 'prop-types';

const button = ({ content, onClick, type }) => {
  const onBtnClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button type={type} onClick={onBtnClick}>{content}</button>
  );
};

button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  groupButton: PropTypes.bool,
  type: PropTypes.string,
};

button.defaultProps = {
  type: 'primary',
  content: '',
  className: '',
  groupButton: false,
};

export default button;
