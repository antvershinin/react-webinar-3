import { generateCode, getCartTotal } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cart: { total: 0, products: [] }, isModalOpen : false };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  addToCart(code) {
    const item = this.state.list.find(el => el.code === code);
    const index = this.state.cart.products.findIndex(el => el.code === code);
    const newCartProducts =
      index === -1
        ? [...this.state.cart.products, { ...item, quantity: 1 }]
        : this.state.cart.products.map(el => {
            if (el.code !== code) return el;
            else return { ...el, quantity: el.quantity + 1 };
          });
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: [...newCartProducts],
        total: getCartTotal(newCartProducts),
      },
    });
  }

  changeModal(tumbler) {
    this.setState({
      ...this.state,
      isModalOpen: tumbler
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  removeFromCart(code) {
    const newCartProducts = this.state.cart.products.filter(el=>el.code !== code)
    this.setState({
      ...this.state,
      cart : {
        products: [...newCartProducts],
        total:getCartTotal(newCartProducts)
      }
    })
  }
}

export default Store;
