import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isModalOpen } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onCart: useCallback(
      tumbler => {
        store.changeModal(tumbler);
      },
      [store],
    ),
    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onCart={() => callbacks.onCart(true)} cart={cart} />
        <List list={list} handleClick={callbacks.onAddToCart} buttonTitle="Добавить" />
      </PageLayout>
      <Modal isModalOpen={isModalOpen} onCart={() => callbacks.onCart(false)} cart={cart} onRemove={callbacks.onRemoveFromCart}/>
    </>
  );
}

export default App;
