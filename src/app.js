import React, { useCallback } from 'react';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import MainList from './components/main-list';
import Cart from './components/cart';

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
        <MainList
          cart={cart}
          onControlsClick={() => callbacks.onCart(true)}
          list={list}
          onItemClick={callbacks.onAddToCart}
        />
      </PageLayout>
      <Modal
        isModalOpen={isModalOpen}
        onClickCloseModal={() => callbacks.onCart(false)}
        headTitle="Корзина"
      >
        <Cart cart={cart} onRemove={callbacks.onRemoveFromCart} />
      </Modal>
    </>
  );
}

export default App;
