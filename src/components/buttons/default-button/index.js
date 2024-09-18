import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function DefaultButton({ onClick = () => {}, buttonTitle = '' }) {

  return (
    <div className="Button">
       <button onClick={onClick}>{buttonTitle}</button>
    </div>
  );
}

DefaultButton.propTypes = {
  onClick: PropTypes.func,
};


export default React.memo(DefaultButton);
