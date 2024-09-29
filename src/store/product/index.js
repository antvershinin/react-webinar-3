import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {};
  }

  async loadOne(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=description,madeIn(title,code),category(title),title,price,edition,_id`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
        productLoading:false
      },
      'Загружен товар из АПИ',
    );
  }
}

export default Product;
