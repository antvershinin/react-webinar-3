import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, handleClick, buttonTitle, forCart = false }) {

  return (
    <div className="List">
      {list && list.map(item => (
        <div key={item.code} className="List-item">
          <Item forCart={forCart} item={item} handleClick={handleClick} buttonTitle={buttonTitle} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  handleClick: PropTypes.func,
};

List.defaultProps = {
  handleClick: () => {},
};

export default React.memo(List);
