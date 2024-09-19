import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';


function List({ list = [], handleClick = () => {}, buttonTitle = '', forCart = false }) {

  const cn = bem('List')

  return (
    <div className={cn()}>
      {list && list.map(item => (
        <div key={item.code} className={cn("item")}>
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
  buttonTitle:PropTypes.string,
  forCart:PropTypes.bool
};


export default React.memo(List);
