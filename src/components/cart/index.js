import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import { formatSumm } from '../../utils';

function Cart({ cart, onRemove = () => {},  }) {
  const cn = bem('Cart');

  return (
      <div className={cn()}>
        <List list={cart.products} handleClick={onRemove} forCart buttonTitle="Удалить" />
        <div className={cn('summary')}>
          <span>Итого</span> {formatSumm(cart.total)}
        </div>
      </div>
  );
}

Cart.PropTypes = {
  cart: PropTypes.shape({
    total: PropTypes.number,
    products: PropTypes.array,
  }),
  onRemove:PropTypes.func
};

export default React.memo(Cart);
