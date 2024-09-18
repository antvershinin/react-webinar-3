import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import DefaultButton from '../buttons/default-button';

function Head({ title, button }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className='Head-button'>{button && <DefaultButton buttonTitle={button.buttonTitle} onClick={button.onClick}/>}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  button:PropTypes.shape({
    buttonTitle : PropTypes.string,
    onClick : PropTypes.func
  })
};

export default React.memo(Head);
