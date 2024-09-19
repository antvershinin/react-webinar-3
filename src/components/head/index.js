import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Head({ title = '', children = [] }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Head);
