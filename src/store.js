/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Добавление новой записи
   */
  addItem() {
    const lastCode = this.state.list.length ? this.state.list[this.state.list.length - 1].code : 0
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: lastCode + 1, title: 'Новая запись', clicked:0 }], 
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, e) {
    e.stopPropagation()
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected
        } else item.selected = false
        
        if (item.selected && !item.clicked) {
          item.clicked = 1
        } else if (item.selected && item.clicked) {
          item.clicked ++
        }
        

        return item;
      }),
    });
  }
}

export default Store;
