import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useLocale } from '../../hooks/localization/locale-provider';

function ProductDetails(props) {
  const [loading, setLoading] = useState(props.loading);
  const cn = bem('ProductDetails');
  const { product } = props;
  const madeIn = { ...product.madeIn };
  const category = { ...product.category };
  const {translate} = useLocale()

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
        {translate('origin')}:{' '}
        <span className={cn('bold')}>
          {madeIn.title} ({madeIn.code})
        </span>
      </div>
      <div className={cn('category')}>
        {translate('category')}: <span className={cn('bold')}>{category.title}</span>
      </div>
      <div className={cn('edition')}>
        {translate('year')}: <span className={cn('bold')}>{product.edition}</span>
      </div>
      <div className={cn('price')}>
        <span className={cn('bold')}>{translate('price')}: {product.price}</span>
      </div>
      <button className={cn('controls')} onClick={callbacks.onAdd}>{translate('add-to-basket')}</button>
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
