import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './style.css';
import useStore from '../../store/use-store';
import { useLocale } from '../../hooks/localization/locale-provider';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const navigate = useNavigate()
  const store = useStore();
  const { translate } = useLocale()

  const callbacks = {
    handleHome: useCallback( () => {
      store.actions.catalog.setActivePage(1)
      store.actions.catalog.load();
      navigate('/')
    },[])}

  return (
    <div className={cn()}>
      <span className={cn('home')} onClick={callbacks.handleHome}>{translate('main')}</span>
      <div>
        <span className={cn('label')}>{translate('in-basket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${translate('one')}`,
                few: `${translate('few')}`,
                many: `${translate('many')}`,
              })} / ${numberFormat(sum)} ₽`
            : `${translate('empty')}`}
        </span>
      <button onClick={onOpen}>{translate('move')}</button>
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
