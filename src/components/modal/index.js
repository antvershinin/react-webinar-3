import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import { cn as bem } from '@bem-react/classname';
import Controls from '../controls';

function Modal({ children = [], isModalOpen = false, onClickCloseModal = () => {}, headTitle = '' }) {
  const cn = bem('Modal');

  return (
    <div className={cn()} style={isModalOpen ? { visibility: 'visible' } : {}}>
      <div className={cn('content')}>
        <Head title={headTitle}>
          <Controls buttonTitle='Закрыть' onClick={onClickCloseModal}/>
        </Head>
        {children}
      </div>
    </div>
  );
}

Modal.PropTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool,
  onClickCloseModal:PropTypes.func,
  headTitle:PropTypes.string
};

export default React.memo(Modal);
