import React from 'react';
import PropTypes, { bool } from 'prop-types';
import './style.css';
import { formatSumm, plural } from '../../utils';

function Controls({ onCart, cart }) {

  const cartSummary = `${cart.products.length} ${plural(cart.products.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatSumm(cart.total)}`

  return (
    <div className="Controls">
      <div className='Controls-summary'>
        <span>В корзине: </span>
        <span style={{fontWeight:'bold'}}>{cart.products.length ? cartSummary : 'пусто'}</span>
      </div>
      <button onClick={() => onCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onCart: PropTypes.func,
};

Controls.defaultProps = {
  onCart: () => {},
};

export default React.memo(Controls);
