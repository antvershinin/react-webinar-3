import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatSumm, plural } from '../../utils';
import Controls from '../controls';
import List from '../list';

function MainList({ cart, onControlsClick = () => {}, onItemClick = () => {}, list = [] }) {
  const cartSummary = `${cart.products.length} ${plural(cart.products.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatSumm(cart.total)}`;

  const cn = bem('MainList');

  return (
    <div className={cn()}>
      <Controls buttonTitle="Перейти" onClick={onControlsClick}>
        <div>
          <span>В корзине: </span>
          <span style={{ fontWeight: 'bold' }}>{cart.products.length ? cartSummary : 'пусто'}</span>
        </div>
      </Controls>
      <List forCart={false} buttonTitle="Добавить" handleClick={onItemClick} list={list} />
    </div>
  );
}

MainList.propTypes = {
  cart: PropTypes.shape({
    total: PropTypes.number,
    products: PropTypes.array,
  }).isRequired,
  onControlsClick: PropTypes.func,
  onItemClick: PropTypes.func,
  list: PropTypes.array,
};

export default React.memo(MainList);
