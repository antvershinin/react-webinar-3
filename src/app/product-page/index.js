import { memo, useCallback, useEffect, useState } from 'react';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/product-details';


function ProductPage() {
  const store = useStore();
  const { id } = useParams()

  useEffect(() => {
    store.actions.catalog.loadOne(id);
  }, [id]);

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product:state.catalog.product,
    loading:state.catalog.productLoading
  }));

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {select.product ? <ProductDetails onAdd={callbacks.addToBasket} loading={select.loading} product={select.product}/> : <div>Товар не найден, возвращайтесь назад</div>}
    </PageLayout>
  );
}



export default memo(ProductPage);
