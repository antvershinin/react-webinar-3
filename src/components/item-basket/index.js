import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { useLocale } from '../../hooks/localization/locale-provider';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const {translate} = useLocale()

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onProductClick: e => props.onProductClick(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onProductClick}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate(`${props.item.amount > 1 ? 'pcs' : 'pc'}`)}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('delete')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onProductClick:PropTypes.func
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
