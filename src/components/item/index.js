import React from 'react';
import PropTypes from 'prop-types';
import { formatSumm } from '../../utils';
import './style.css';
import DefaultButton from '../buttons/default-button';
import { cn as bem } from '@bem-react/classname';

function Item({ item, handleClick = () => {}, forCart = false, buttonTitle = '' }) {
  const callbacks = {
    handleClick: e => {
      e.stopPropagation();
      handleClick(item.code);
    },
  };

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
        <div className={cn('price')}>
          <div>{formatSumm(item.price)}</div>
          {forCart && (
            <div style={{ width: '50px', justifyContent: 'flex-end' }}>{item.quantity} шт.</div>
          )}
        </div>
      </div>
      <div className={cn('actions')}>
        <DefaultButton buttonTitle={buttonTitle} onClick={callbacks.handleClick} />
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
  forCart: PropTypes.bool,
};

export default React.memo(Item);
