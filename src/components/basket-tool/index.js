import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './style.css';
import useStore from '../../store/use-store';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const navigate = useNavigate()
  const store = useStore();

  const callbacks = {
    handleHome: useCallback( () => {
      store.actions.catalog.setActivePage(1)
      store.actions.catalog.load();
      navigate('/')
    },[])}

  return (
    <div className={cn()}>
      <span className={cn('home')} onClick={callbacks.handleHome}>Главная</span>
      <div>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `пусто`}
        </span>
      <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
