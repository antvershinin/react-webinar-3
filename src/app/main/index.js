import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/localization/locale-provider';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const { translate } = useLocale()
  let limit = 10

  useEffect(() => {
    store.actions.catalog.load(limit);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activePage: state.catalog.activePage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Получаем данные с сервера в зависимости от отданного индекса из компонента пагинации
    getIndex: useCallback(i => {
      store.actions.catalog.setActivePage(i)
      store.actions.catalog.load(limit);
    }),
    // Переходим на страницу продукта
    viewProductDedails: useCallback(id => navigate(`/product/${id}`)),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onProductClick={callbacks.viewProductDedails}
          />
        );
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('shop')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onClickPage={callbacks.getIndex}
        activePage={select.activePage}
        pageCount={Math.ceil(select.count / limit)}
      />
    </PageLayout>
  );
}

export default memo(Main);
