import React from 'react';
import PropTypes from 'prop-types';
import { formatSumm } from '../../utils';
import './style.css';
import DefaultButton from '../buttons/default-button';

function Item(props) {
  const callbacks = {
    handleClick: e => {
      e.stopPropagation();
      props.handleClick(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
        <div className="Item-price">
          <div>{formatSumm(props.item.price)}</div>
          {props.forCart && <div  style={{width:'50px', justifyContent:'flex-end'}}>{props.item.quantity} шт.</div>}
        </div>
      </div>
      <div className="Item-actions">
        <DefaultButton buttonTitle={props.buttonTitle} onClick={callbacks.handleClick}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

Item.defaultProps = {
  handleClick: () => {},
};

export default React.memo(Item);
