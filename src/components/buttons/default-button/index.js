import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function DefaultButton({ onClick = () => {}, buttonTitle = '' }) {
  const cn = bem('DefaultButton');

  return (
    <div className={cn()}>
      <button onClick={onClick}>{buttonTitle}</button>
    </div>
  );
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

export default React.memo(DefaultButton);
