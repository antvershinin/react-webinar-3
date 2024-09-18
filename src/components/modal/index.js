import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import Head from '../head';
import List from '../list';
import { formatSumm } from '../../utils';

function Modal({isModalOpen = false, cart = {}, onCart = () => {}, onRemove = () => {}}) {

    return (
      <div className="Modal" style={isModalOpen ? {visibility:'visible'} : {}}>
        <div className='Modal-content'>
        <Head title="Корзина" button={{buttonTitle : 'Закрыть', onClick : onCart}}/>
        <List list={cart.products} handleClick={onRemove} forCart buttonTitle="Удалить"/>
        <div className='Modal-summary'><span>Итого</span> {formatSumm(cart.total)}</div>
        </div>
      </div>
    );
}

Modal.PropTypes = {
    isModalOpen:PropTypes.bool,
    onRemove:PropTypes.func
}


export default React.memo(Modal);