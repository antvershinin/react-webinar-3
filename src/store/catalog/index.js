import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      activePage: 1,
      product:{},
      productLoading: true
    };
  }

  async load() {
    const skip = (this.getState().activePage - 1) * 10
    const response = await fetch(`api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        product:{},
        productLoading:true
      },
      'Загружены товары из АПИ',
    );
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
  setActivePage(page) {
    this.setState({
      ...this.getState(),
      activePage:page
    })
  }
}

export default Catalog;
