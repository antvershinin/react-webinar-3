import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import List from '../list';
import { formatSumm } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import DefaultButton from '../buttons/default-button';
import Controls from '../controls';

function Modal({ isModalOpen = false, cart = {}, onCart = () => {}, onRemove = () => {} }) {
  const cn = bem('Modal');

  return (
    <div className={cn()} style={isModalOpen ? { visibility: 'visible' } : {}}>
      <div className={cn('content')}>
        <Head title="Корзина">
          <Controls buttonTitle="Закрыть" onClick={onCart} />
        </Head>
        <List list={cart.products} handleClick={onRemove} forCart buttonTitle="Удалить" />
        <div className={cn('summary')}>
          <span>Итого</span> {formatSumm(cart.total)}
        </div>
      </div>
    </div>
  );
}

Modal.PropTypes = {
  isModalOpen: PropTypes.bool,
  cart: PropTypes.shape({
    total: PropTypes.number,
    products: PropTypes.array,
  }),
  onRemove: PropTypes.func,
  onCart: PropTypes.func,
};

export default React.memo(Modal);
