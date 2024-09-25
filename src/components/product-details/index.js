import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProductDetails(props) {
  const [loading, setLoading] = useState(props.loading);
  const cn = bem('ProductDetails');
  const { product } = props;
  const madeIn = { ...product.madeIn };
  const category = { ...product.category };

  const callbacks = {
    onAdd: e => props.onAdd(props.product._id)
  };

  useEffect(()=>{
    setLoading(props.loading)
  },[props.loading])

  if (loading) return (<>loading</>)
    else return (
    <div className={cn()}>
      <div className={cn('description')}>{product.description}</div>
      <div className={cn('madeIn')}>
        Страна производитель:{' '}
        <span className={cn('bold')}>
          {madeIn.title} ({madeIn.code})
        </span>
      </div>
      <div className={cn('category')}>
        Категория: <span className={cn('bold')}>{category.title}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <span className={cn('bold')}>{product.edition}</span>
      </div>
      <div className={cn('price')}>
        <span className={cn('bold')}>Цена: {product.price}</span>
      </div>
      <button className={cn('controls')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    _id:PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onAdd:PropTypes.func
};

export default memo(ProductDetails);
