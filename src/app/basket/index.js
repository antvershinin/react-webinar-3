import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/localization/locale-provider';

function Basket() {
  const store = useStore();
  const navigate = useNavigate()
  const {translate} = useLocale()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Переход на страницу продукта
    viewProductDedails: useCallback(id => {
      callbacks.closeModal()
      navigate(`/product/${id}`)}),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onProductClick={callbacks.viewProductDedails} onRemove={callbacks.removeFromBasket} />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={translate('basket')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
