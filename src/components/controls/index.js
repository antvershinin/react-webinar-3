import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import DefaultButton from '../buttons/default-button';

function Controls({ onClick = () => {}, buttonTitle = '', children = [] }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('content')}>{children}</div>
      <DefaultButton buttonTitle={buttonTitle} onClick={onClick} />
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  buttonTitle: PropTypes.string,
};

export default React.memo(Controls);
